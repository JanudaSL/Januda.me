import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "newsletter-subscribers.json");
const SHOULD_PERSIST_LOCAL = process.env.NODE_ENV !== "production";
const PDF_PATH = path.join(process.cwd(), "public", "jk.pdf");
const COMPANY_NAME = process.env.COMPANY_NAME || "Januda";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || "janudakodi@gmail.com";
const FROM_EMAIL = process.env.EMAIL_FROM || process.env.EMAIL_USER || "janudakodi@gmail.com";

function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are not configured. Please set EMAIL_USER and EMAIL_PASS.");
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function ensureDataFile() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  try {
    const existing = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(existing);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function saveSubscriber(entry) {
  if (!SHOULD_PERSIST_LOCAL) {
    return entry;
  }

  const subscribers = await ensureDataFile();
  const existing = subscribers.find((item) => item.email === entry.email);
  if (existing) {
    Object.assign(existing, entry);
  } else {
    subscribers.push(entry);
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));
  return entry;
}

function buildAdminHtml(payload) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
      <h2 style="color: #1f2937;">New Newsletter Subscription</h2>
      <p>A new subscriber joined your mailing list.</p>
      <ul>
        <li><strong>Email:</strong> ${payload.email}</li>
        <li><strong>Subscribed At:</strong> ${payload.subscribedAt}</li>
        <li><strong>Source:</strong> Website footer newsletter</li>
      </ul>
    </div>
  `;
}

function buildUserHtml() {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #222;">
      <h2 style="color: #1f2937;">Thanks for subscribing!</h2>
      <p>Welcome to ${COMPANY_NAME} updates.</p>
      <p>You&apos;ve successfully subscribed to product news and updates straight to your inbox.</p>
      <p>As a thank you, I&apos;ve attached my portfolio/profile PDF so you can learn more about my work, experience, and services.</p>
      <p>Looking forward to staying in touch!</p>
      <p>Best regards,<br/>
      <strong>${COMPANY_NAME}</strong>
      </p>
    </div>
  `;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const payload = {
      id: crypto.randomUUID(),
      email,
      subscribedAt: new Date().toISOString(),
      emailStatus: {
        admin: "pending",
        user: "pending",
      },
    };

    if (SHOULD_PERSIST_LOCAL) {
      await saveSubscriber(payload);
    }

    const transporter = createTransporter();
    const attachmentExists = await fs
      .access(PDF_PATH)
      .then(() => true)
      .catch(() => false);

    const adminOptions = {
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New newsletter subscriber: ${payload.email}`,
      html: buildAdminHtml(payload),
    };

    const userOptions = {
      from: FROM_EMAIL,
      to: payload.email,
      subject: "Thanks for subscribing",
      html: buildUserHtml(),
      attachments: attachmentExists
        ? [{ filename: "januda-company-profile.pdf", path: PDF_PATH }]
        : [],
    };

    const [adminResult, userResult] = await Promise.allSettled([
      transporter.sendMail(adminOptions),
      transporter.sendMail(userOptions),
    ]);

    if (adminResult.status === "fulfilled") {
      payload.emailStatus.admin = "sent";
    } else {
      payload.emailStatus.admin = "failed";
      console.error("Newsletter admin email failed:", adminResult.reason);
    }

    if (userResult.status === "fulfilled") {
      payload.emailStatus.user = "sent";
    } else {
      payload.emailStatus.user = "failed";
      console.error("Newsletter confirmation email failed:", userResult.reason);
    }

    if (SHOULD_PERSIST_LOCAL) {
      await saveSubscriber(payload);
    }

    return NextResponse.json({
      success: true,
      message: "Subscription successful. A confirmation email has been sent.",
      emailStatus: payload.emailStatus,
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Could not complete subscription at this time. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
