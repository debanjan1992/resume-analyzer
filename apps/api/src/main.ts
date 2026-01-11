import express from 'express';
import * as path from 'path';
import { onRequest } from 'firebase-functions/v2/https';
import { analyzeResume, extractTextFromPDFHandler } from './resume.controller';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to the Resume Analyzer API!' });
});

app.post('/api/extractText', (req, res) => {
  extractTextFromPDFHandler(req, res);
});

app.post('/api/analyze', (req, res) => {
  setTimeout(
    () =>
      res.json({
        success: true,
        data: {
          targetRole: 'HR & Finance Intern',
          overallScore: 15,
          scoreBreakdown: {
            hardSkills: 0,
            experience: 0,
            metrics: 5,
            formatting: 10,
            education: 0,
            relevance: 0,
          },
          powerVerbs: {
            count: 19,
            score: 8,
            list: [
              'Architected',
              'Designed',
              'Implemented',
              'Collaborated',
              'Optimizing',
            ],
            weakVerbs: [
              'Worked on',
              'Responsible for',
              'Helped',
              'Involved in',
              'Taking the responsibilities of',
            ],
          },
          quantifiableMetrics: {
            count: 4,
            list: [
              'Frontend Developer with 11+ years of expertise in Angular and React',
              'Have been a part of the 4 member UI SME group for Global NICE',
              'Worked on development and automation of 17 workflows across multiple middleware technologies',
              'Developed 7-8 fully functional robust and mobile responsive websites',
            ],
            suggestion:
              'Add metrics related to business impact, efficiency gains, or cost savings, especially if applying for roles where these are relevant. For this specific JD, metrics related to HR/Finance processes would be needed.',
          },
          essentialSections: {
            missing: [],
            detected: [
              'Profile',
              'Professional Experience',
              'Education',
              'Skills',
            ],
          },
          softSkills: {
            detected: [
              'Collaboration',
              'Leadership',
              'Teamwork',
              'Problem-solving',
              'Communication',
            ],
            missing: [
              'Organizational skills',
              'Willingness to work in a startup environment',
              'Ability to handle multiple tasks',
            ],
          },
          keywordMatch: {
            score: 5,
            matched: ['Bengaluru', 'English'],
            missingHighPriority: [
              'Kannada',
              'MS Excel',
              'Google Sheets',
              'HR operations',
              'Finance',
              'Recruitment',
              'Onboarding',
              'Payroll',
              'Expense tracking',
              'Invoice processing',
              'Basic accounting',
              'GST',
              'Statutory documentation',
              'Compliance',
            ],
            missingLowPriority: ['Tally', 'Zoho Books'],
          },
          formattingCheck: {
            isBulletPointsUsed: true,
            isChronological: true,
            tone: 'Professional',
            issues: [],
          },
          criticalFixes: [
            "The candidate's profile (Senior Frontend Engineer) is completely misaligned with the HR & Finance Intern role.",
            'Missing mandatory language proficiency (Kannada).',
            'Missing all core hard skills required for the role (e.g., MS Excel, accounting software).',
            'Missing relevant experience in HR, Finance, or Administration.',
          ],
          recommendedImprovements: [
            'Do not apply for this specific internship role as it is a complete mismatch for your professional background and career stage.',
            'Tailor your resume significantly for each job application, focusing on relevant skills and experience.',
            'If interested in a career pivot, consider entry-level roles in the desired field and acquire foundational skills/certifications.',
          ],
        },
      }),
    10000,
  );

  // analyzeResume(req, res);
});

if (process.env.NX_CLI_SET) {
  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

export const api = onRequest(app);
