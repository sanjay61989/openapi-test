const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const specDir = path.resolve(__dirname, 'api-specs'); // Base directory for Swagger files
const outputBaseDir = path.resolve(__dirname, 'api-services'); // Output directory
const openApiGenerator = 'openapi-generator-cli'; // CLI for OpenAPI generator

function replaceDownloadUrl(filePath, url) {
   if (!fs.existsSync(filePath)) {
      console.error('❌ File not found:', filePath);
      return;
   }

   try {
      const data = fs.readFileSync(filePath, 'utf8');
      const updated = data.replace(/\$\{downloadUrl\}/g, url);
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log('✅ Replaced ${downloadUrl} successfully.');
   } catch (err) {
      console.error('❌ Error processing file:', err);
   }
}

function clearDirectory() {
   if (!fs.existsSync(outputBaseDir)) {
      return;
   }
   console.log(`Deleting generated files....`);
   fs.readdirSync(outputBaseDir).forEach((file) => {
      const filePath = path.join(outputBaseDir, file);
      if (fs.lstatSync(filePath).isDirectory()) {
         fs.rmSync(filePath, { recursive: true, force: true });
      } else {
         fs.unlinkSync(filePath);
      }
   });
}

// Recursively fetch all JSON files from a directory
function getSwaggerFiles(dir) {
   let files = [];
   fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
         files = files.concat(getSwaggerFiles(fullPath)); // Recursive call for subdirectories
      } else if (file.endsWith('.json')) {
         files.push(fullPath);
      }
   });
   return files;
}

// Generate Angular services from Swagger files
function generateServices() {
   clearDirectory();
   const swaggerFiles = getSwaggerFiles(specDir);

   if (swaggerFiles.length === 0) {
      console.log('No Swagger JSON files found. Exiting.');
      process.exit(0); // Exit gracefully if no Swagger files are found
   }

   // Set custom Maven repository URL
   // maven-test:password
   const file = path.join('D:', 'openapi-test', 'openapitools.json');
   const downloadUrl = `http://${process.env.MAVEN_USERNAME}:${process.env.MAVEN_PASSWORD}@localhost:8081/repository/maven-public/\${groupId}/\${artifactId}/\${versionName}/\${artifactId}-\${versionName}.jar`;
   replaceDownloadUrl(file, downloadUrl);

   swaggerFiles.forEach((specPath) => {
      // Read the Swagger file
      const relativePath = path.relative(specDir, specPath); // Maintain subdirectory structure
      const outputDir = path.join(outputBaseDir, relativePath.replace('swagger.json', '')); // Output path without ".json"

      console.log(`Generating services for ${specPath}...`);

      try {
         // openapi-generator-cli generate -i swagger.json -g typescript-angular -o src/app/api --additional-properties=providedInRoot=true --skip-validate-spec
         execSync(
            `npx ${openApiGenerator} generate -i ${specPath} -g typescript-angular -o ${outputDir} --skip-validate-spec`,
            {
               stdio: 'inherit',
            }
         );
         // execSync(
         //   `java -jar ./openapi-generator-cli-7.13.0.jar generate -i ${specPath} -g typescript-angular -o ${outputDir} -t ./templates/ --skip-validate-spec`,
         //   {
         //     stdio: 'inherit',
         //   }
         // );

         console.log(`Services generated for ${specPath}`);
      } catch (error) {
         console.error(`Error generating services for ${specPath}:`, error);
         process.exit(1);
      }
   });
}

generateServices();
