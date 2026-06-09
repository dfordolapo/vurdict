import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';

export async function sendReportByEmail({ email, url, goal, experience, report, statusLabel, formattedDateTime }) {
  const dims = [
    { label: 'Structural Logic', key: 'process_visibility' },
    { label: 'Critical Thinking', key: 'problem_framing' },
    { label: 'Visual Execution', key: 'visual_quality' },
    { label: 'Impact Evidence', key: 'outcome_impact' },
    { label: 'Narrative Tone', key: 'trust_cta' },
    { label: 'Positioning Clarity', key: 'niche_positioning' },
  ];

  const dimRows = dims.map((d) => {
    const cat = report.categories?.[d.key];
    const score = cat?.score ?? 0;
    const color = score >= 80 ? '#059669' : score >= 70 ? '#2563eb' : score >= 55 ? '#d97706' : '#e11d48';
    return `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#1e293b;font-weight:600;">${d.label}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;text-align:center;">
          <span style="display:inline-block;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:700;color:${color};background:${color}10;border:1px solid ${color}30;">${score}/100</span>
        </td>
        <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.5;">${cat?.explanation || ''}</td>
      </tr>`;
  }).join('');

  const goalLabel = goal === 'win_clients' ? 'Win Freelance Clients' : goal === 'improve_portfolio' ? 'Improve Portfolio Quality' : 'Get Hired';
  const scoreColor = report.overall_score >= 80 ? '#059669' : report.overall_score >= 70 ? '#2563eb' : report.overall_score >= 55 ? '#d97706' : '#e11d48';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vurdict Report</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;font-family:'Inter',system-ui,sans-serif;background:#f8fafc;color:#0f172a;">
  <div style="max-width:600px;margin:0 auto;">
    <div style="background:#172554;padding:32px 40px;text-align:center;">
      <div style="margin-bottom:8px;">
        <span style="font-size:20px;font-weight:800;color:#fff;letter-spacing:-0.5px;">vurdict</span>
      </div>
      <h1 style="margin:0;font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.3px;">Case Study Evaluation</h1>
    </div>
    <div style="background:#fff;border:1px solid #e2e8f0;border-top:none;padding:28px 32px;">
      <table style="width:100%;font-size:13px;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#64748b;">URL</td><td style="padding:6px 0;font-weight:500;color:#0f172a;">${url || 'N/A'}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;">Date</td><td style="padding:6px 0;font-weight:500;color:#0f172a;">${formattedDateTime}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b;">Goal</td><td style="padding:6px 0;font-weight:500;color:#0f172a;">${goalLabel}</td></tr>
        <tr><td style="padding:6px 0;border-bottom:2px solid #f1f5f9;color:#64748b;">Experience</td><td style="padding:6px 0;border-bottom:2px solid #f1f5f9;font-weight:500;color:#0f172a;">${experience || 'Junior'}</td></tr>
      </table>
      <div style="text-align:center;padding:24px 0 20px;">
        <div style="display:inline-flex;flex-direction:column;align-items:center;">
          <span style="font-size:48px;font-weight:800;color:${scoreColor};line-height:1;">${report.overall_score}</span>
          <span style="font-size:13px;color:#94a3b8;font-weight:600;margin-top:2px;">out of 100</span>
          <span style="margin-top:8px;display:inline-block;padding:4px 16px;border-radius:999px;font-size:12px;font-weight:700;color:${scoreColor};background:${scoreColor}10;border:1px solid ${scoreColor}30;">${statusLabel}</span>
        </div>
      </div>
      <h2 style="font-size:14px;font-weight:700;color:#0f172a;margin:0 0 4px;">Dimension Breakdown</h2>
      <p style="font-size:12px;color:#94a3b8;margin:0 0 16px;">How your case study scored across each evaluation dimension.</p>
      <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
        <thead>
          <tr style="background:#f8fafc;">
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Dimension</th>
            <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Score</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e2e8f0;">Analysis</th>
          </tr>
        </thead>
        <tbody>${dimRows}</tbody>
      </table>
      ${report.fix_this_first ? `
      <div style="margin-top:24px;padding:18px 22px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;">
        <div style="margin-bottom:4px;">
          <span style="font-size:11px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:0.5px;">Top Recommendation</span>
        </div>
        <h3 style="margin:0 0 4px;font-size:14px;font-weight:700;color:#1e293b;">${report.fix_this_first.title || 'Improve Your Portfolio'}</h3>
        <p style="margin:0;font-size:12px;color:#78716c;line-height:1.6;">${report.fix_this_first.description || ''}</p>
        ${report.fix_this_first.priority_score ? `<span style="display:inline-block;margin-top:8px;font-size:11px;font-weight:600;color:#92400e;">Priority Score: ${report.fix_this_first.priority_score}/10</span>` : ''}
      </div>` : ''}
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #f1f5f9;text-align:center;font-size:11px;color:#94a3b8;">
        <p style="margin:0;">Generated by <strong style="color:#172554;">Vurdict</strong> — AI Portfolio Feedback for Product Designers</p>
        <p style="margin:4px 0 0;">vurdict.vercel.app</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  const text = [
    `VURDICT PORTFOLIO REPORT`,
    ``,
    `URL: ${url || 'N/A'}`,
    `Date: ${formattedDateTime}`,
    `Goal: ${goalLabel}`,
    `Experience: ${experience || 'Junior'}`,
    ``,
    `Overall Score: ${report.overall_score}/100 (${statusLabel})`,
    ``,
    ...dims.map((d) => {
      const cat = report.categories?.[d.key];
      return `${d.label}: ${cat?.score ?? 'N/A'}/100 — ${cat?.explanation || ''}`;
    }),
    ``,
    report.fix_this_first ? `Top Recommendation: ${report.fix_this_first.title} — ${report.fix_this_first.description}` : '',
    ``,
    `Generated by Vurdict — vurdict.vercel.app`,
  ].join('\n');

  await resend.emails.send({
    from: `Vurdict <${FROM_EMAIL}>`,
    to: email,
    subject: `Your Vurdict Case Study Evaluation — ${report.overall_score}/100`,
    html,
    text,
  });
}
