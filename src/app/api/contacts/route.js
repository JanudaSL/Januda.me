import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "contact-submissions.json");
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

async function saveSubmission(entry) {
  if (!SHOULD_PERSIST_LOCAL) {
    return entry;
  }

  const submissions = await ensureDataFile();
  submissions.push(entry);
  await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));
  return entry;
}

async function updateSubmission(id, updates) {
  if (!SHOULD_PERSIST_LOCAL) {
    return { id, ...updates };
  }

  const submissions = await ensureDataFile();
  const target = submissions.find((item) => item.id === id);
  if (!target) return null;
  Object.assign(target, updates);
  await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2));
  return target;
}

function buildAdminHtml(payload) {
  const submittedAt = payload.submittedAt || new Date().toISOString();
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
      <h2 style="color: #1f2937;">New Contact Form Submission</h2>
      <p>You received a new inquiry from your website contact form.</p>
      <ul>
        <li><strong>Full Name:</strong> ${payload.fullName}</li>
        <li><strong>Email:</strong> ${payload.email}</li>
        <li><strong>Phone:</strong> ${payload.phone}</li>
        <li><strong>Country:</strong> ${payload.country}</li>
        <li><strong>Area of Interest:</strong> ${payload.interested}</li>
        <li><strong>Subscribed:</strong> ${payload.subscribe ? "Yes" : "No"}</li>
        <li><strong>Submitted At:</strong> ${submittedAt}</li>
      </ul>
      <div style="margin-top: 12px; padding: 12px; background: #f9fafb; border-radius: 8px;">
        <strong>Message:</strong>
        <p style="margin: 6px 0 0; white-space: pre-wrap;">${payload.message}</p>
      </div>
    </div>
  `;
}

function buildUserHtml(fullName) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #222;">
      <h2 style="color: #1f2937;">Thank You for Contacting Me</h2>
      <p>Dear ${fullName},</p>
      <p>Thank you for reaching out through my portfolio website.</p>
      <p>This email confirms that I have successfully received your message. I truly appreciate your interest and the time you took to get in touch.</p>
      <p>Your inquiry has been received and will be reviewed carefully. I will respond as soon as possible, typically within 24 hours, depending on the nature of your request.</p>
      <p>In the meantime, I&apos;ve attached my portfolio/profile PDF so you can learn more about my work, experience, and the services I offer.</p>
      <p>Thank you once again for your interest. I look forward to connecting with you soon.</p>
      <p>Best regards,<br/>
      <strong>Januda Janandith</strong><br/>
      Software Engineer | Full-Stack Developer<br/>
      📧 <a href="mailto:janudakodi@gmail.com">janudakodi@gmail.com</a><br/>
      📱 +94 77 300 7426
      💼 LinkedIn: https://www.linkedin.com/in/januda-kodithuwakku/
      </p>
    </div>
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = {
      id: crypto.randomUUID(),
      fullName: body.fullName?.trim() || "",
      email: body.email?.trim().toLowerCase() || "",
      phone: body.phone?.trim() || "",
      country: body.country?.trim() || "",
      interested: (body.interested || body.areaOfInterest)?.trim() || "",
      subscribe: Boolean(body.subscribe),
      message: body.message?.trim() || "",
      submittedAt: body.submittedAt || new Date().toISOString(),
      emailStatus: {
        admin: "pending",
        user: "pending",
      },
    };

    if (!payload.fullName || !payload.email || !payload.message) {
      return NextResponse.json(
        { success: false, error: "Full name, email, and message are required." },
        { status: 400 }
      );
    }

    if (SHOULD_PERSIST_LOCAL) {
      await saveSubmission(payload);
    }

    const transporter = createTransporter();
    const attachmentExists = await fs
      .access(PDF_PATH)
      .then(() => true)
      .catch(() => false);

    const emailOptions = {
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New contact form submission from ${payload.fullName}`,
      html: buildAdminHtml(payload),
    };

    const userOptions = {
      from: FROM_EMAIL,
      to: payload.email,
      subject: "Thank You for Contacting Me",
      html: buildUserHtml(payload.fullName),
      attachments: attachmentExists
        ? [{ filename: "januda-company-profile.pdf", path: PDF_PATH }]
        : [],
    };

    // Always notify admin. Send the user confirmation only if they subscribed.
    const adminPromise = transporter.sendMail(emailOptions);
    const userPromise = payload.subscribe ? transporter.sendMail(userOptions) : Promise.resolve(null);

    const [adminResult, userResult] = await Promise.allSettled([adminPromise, userPromise]);

    if (adminResult.status === "fulfilled") {
      payload.emailStatus.admin = "sent";
    } else {
      console.error("Admin email failed:", adminResult.reason);
      payload.emailStatus.admin = "failed";
    }

    if (payload.subscribe) {
      if (userResult.status === "fulfilled") {
        payload.emailStatus.user = "sent";
      } else {
        console.error("User confirmation email failed:", userResult.reason);
        payload.emailStatus.user = "failed";
      }
    } else {
      // Not subscribed — no confirmation email sent
      payload.emailStatus.user = "skipped";
    }

    if (SHOULD_PERSIST_LOCAL) {
      await updateSubmission(payload.id, payload);
    }

    return NextResponse.json({
      success: true,
      message: "Your message was received successfully.",
      saved: true,
      emailStatus: payload.emailStatus,
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "We could not process your request right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
 