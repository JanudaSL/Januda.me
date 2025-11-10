import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini client (only if API key exists)
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// Comprehensive knowledge base about Januda from his profile
const JANUDA_CONTEXT = `
You are Januda's personal AI assistant chatbot. You have access to his complete professional profile and should answer questions helpfully, professionally, and conversationally.

JANUDA'S COMPLETE INFORMATION:

PERSONAL DETAILS:
- Full Name: Januda Janandith
- Current Role: Intern Software Engineer
- Phone: 0773007426
- Email: janudakodi@gmail.com
- LinkedIn: https://www.linkedin.com/in/januda-kodithuwakku
- GitHub: https://github.com/kjanuda
- Portfolio: https://kjanuda.github.io/JanudaJK.me/
- Location: Maharagama, Western Province, Sri Lanka

PROFESSIONAL SUMMARY:
A highly motivated and passionate programmer, committed to learning modern technologies. A lifelong learner, consistently staying current with software development trends. A versatile team player, effective both independently and in groups, with strong problem-solving and analytical skills to create innovative solutions for complex challenges.

EDUCATION:
1. Bachelor of Information Technology (Currently Pursuing)
   - University of Colombo
   - Duration: February 2024 - November 2027
   
2. Full Stack Developer Trainee
   - University of Moratuwa - SLASSCOM Program
   - Duration: March 2023 - April 2024
   
3. Full Stack Developer Trainee
   - University of Moratuwa
   - Duration: January 2022 - May 2022
   
4. GCE Advanced Level (Mathematics Stream)
   - Ruhunu Vijayaba College
   - Duration: January 2018 - January 2021

WORK EXPERIENCE:
- Intern Software Engineer at Breadcrumbs Innovations Pvt Ltd
  - Duration: November 2023 - January 2024
  - Location: Colombo

TECHNICAL SKILLS:
Frontend: React.js, Angular, HTML, CSS, JavaScript, Tailwind CSS, Angular Material
Backend: Node.js, Express.js, Laravel, PHP, Spring Boot
Databases: MySQL, MongoDB
Cloud: AWS
Languages: Java, JavaScript, PHP

PROJECTS:

1. JOB4U - MERN Stack Job Portal Web App
   - Duration: June 2024 - August 2024
   - GitHub: https://github.com/kjanuda/JOB4U
   - Tech: React, MongoDB, Node.js, Express.js, Tailwind CSS
   - Features: Advanced job filtering, Google sign-in authentication, job management, responsive UI

2. Daily Task App
   - Duration: November 2023 - December 2023
   - GitHub: https://github.com/kjanuda/Dailytaskapp.git
   - Tech: Laravel, MySQL, Bootstrap
   - Features: Full CRUD operations for task management

3. Employee Management System (EMS)
   - Duration: March 2023 - April 2023
   - GitHub: https://github.com/kjanuda/EmployeeManagementANG.git
   - Tech: Angular 15.0.1, JSON Server, Angular Material
   - Features: Employee data management, CRUD operations, search functionality

4. Contact Book
   - Duration: May 2023 - June 2023
   - GitHub: https://github.com/kjanuda/ContactBook.git
   - Tech: MERN Stack (MongoDB, React, Node.js)
   - Features: Complete CRUD for contact management

LANGUAGES: English (Proficient)

RESPONSE GUIDELINES:
1. Answer questions about Januda's skills, projects, education, experience, and contact information.
2. For questions about his projects: Describe the technology stack, features, duration, and GitHub links.
3. For questions about his skills: Explain his expertise in relevant areas and which projects showcase these skills.
4. For questions about career/lifecycle: Discuss his learning journey from bootcamp training to current role.
5. For non-Januda related questions: Politely redirect saying "I'm Januda's portfolio assistant and can only help with questions about him. Ask me about his skills, projects, experience, or anything else related to Januda!"
6. Be conversational, friendly, and professional.
7. Provide specific details, links, and dates when relevant.
8. Use markdown formatting for better readability when listing projects, skills, or timelines.
`;

export async function POST(request) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please set GEMINI_API_KEY in .env.local' },
        { status: 500 }
      );
    }

    const { question } = await request.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Invalid question format' },
        { status: 400 }
      );
    }

    // Trim and validate question length
    const trimmedQuestion = question.trim();
    if (trimmedQuestion.length === 0) {
      return NextResponse.json(
        { error: 'Question cannot be empty' },
        { status: 400 }
      );
    }

    if (trimmedQuestion.length > 500) {
      return NextResponse.json(
        { error: 'Question is too long. Please keep it under 500 characters.' },
        { status: 400 }
      );
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    // Enhanced prompt for better contextual understanding
    const systemPrompt = `${JANUDA_CONTEXT}

User Question: "${trimmedQuestion}"

Instructions:
- Analyze the question carefully and determine if it's about Januda
- If it's about his projects, explain in detail with tech stack and links
- If it's about his lifecycle/career journey, describe his progression and learning path
- If it's about skills, mention relevant projects that demonstrate those skills
- Always be helpful, friendly, and professional
- Use markdown formatting for better readability

Please provide a helpful and professional response:`;

    // Generate response
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const answer = response.text() || 'Sorry, I could not generate a response. Please try again.';

    return NextResponse.json({ 
      answer: answer.trim(),
      timestamp: new Date().toISOString(),
      question: trimmedQuestion
    });

  } catch (error) {
    console.error('Gemini API Error:', error);

    // Handle specific Gemini errors
    if (error.message?.includes('API key') || error.message?.includes('API_KEY_INVALID')) {
      return NextResponse.json(
        { error: 'Invalid Gemini API key. Please check your configuration.' },
        { status: 401 }
      );
    }

    if (error.message?.includes('quota') || error.message?.includes('rate limit') || error.message?.includes('RESOURCE_EXHAUSTED')) {
      return NextResponse.json(
        { error: 'API quota exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    if (error.message?.includes('safety') || error.message?.includes('SAFETY')) {
      return NextResponse.json(
        { error: 'Your question was flagged by safety filters. Please rephrase.' },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to process request. Please try again later.' },
      { status: 500 }
    );
  }
}

// Use Node.js runtime for Gemini API
export const runtime = 'nodejs';
