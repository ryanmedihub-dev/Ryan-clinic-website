import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
env.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) process.env[k.trim()] = v.join('=').trim();
});

async function testRender() {
  try {
    const { DBConnection } = await import('../src/lib/db.js');
    await DBConnection();
    const mongoose = (await import('mongoose')).default;
    const Surgery = mongoose.models.SurgeryPage || (await import('../src/models/SurgeryPage.js')).default;
    const doc = await Surgery.findOne({ slug: 'hair-transplant-surgery-in-mumbai' }).lean();
    const pageData = JSON.parse(JSON.stringify(doc));

    const SurgeryPageClient = (await import('../src/components/surgery/SurgeryPageClient.js')).default;
    const html = ReactDOMServer.renderToString(React.createElement(SurgeryPageClient, { data: pageData }));
    console.log('RENDER SUCCESSFUL! Rendered HTML length:', html.length);
    process.exit(0);
  } catch (err) {
    console.error('RENDER FAILED WITH ERROR:', err);
    process.exit(1);
  }
}

testRender();
