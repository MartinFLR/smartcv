const fs = require('fs');
const path = require('path');

const packageJson = require('./package.json');
const dependencies = Object.keys(packageJson.dependencies || {});

console.log('🔍 Checking dependencies for AVX compatibility issues...\n');

let issuesFound = false;

dependencies.forEach((dep) => {
  try {
    process.stdout.write(`Testing ${dep}... `);
    require(dep);
    console.log('✅ OK');
  } catch (error) {
    console.log('❌ FAILED');
    console.error(`\nError loading ${dep}:`);
    console.error(error.message);
    // console.error(error); // Uncomment for full stack trace
    issuesFound = true;
    if (error.message.includes('illegal instruction') || error.code === 'SIGILL') {
      console.error('🚨 POTENTIAL AVX ISSUE DETECTED 🚨');
    }
  }
});

if (!issuesFound) {
  console.log('\n✅ All dependencies loaded successfully. No immediate AVX crashes detected.');
} else {
  console.log('\n❌ Issues found. Please review the errors above.');
}
