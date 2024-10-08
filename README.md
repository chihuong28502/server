The node.js example app teaches the very basics of how to work with Contentful:

consume content from the Contentful Delivery and Preview APIs
model content
edit content through the Contentful web app
The app demonstrates how decoupling content from its presentation enables greater flexibility and facilitates shipping higher quality software more quickly.

Screenshot of the example app

You can see a hosted version of The node.js example app on Heroku.

What is Contentful?
Contentful provides a content infrastructure for digital teams to power content in websites, apps, and devices. Unlike a CMS, Contentful was built to integrate with the modern software stack. It offers a central hub for structured content, powerful management and delivery APIs, and a customizable web app that enable developers and content creators to ship digital products faster.

Requirements
Node 8
Git
Contentful CLI (only for write access)
Without any changes, this app is connected to a Contentful space with read-only access. To experience the full end-to-end Contentful experience, you need to connect the app to a Contentful space with read and write access. This enables you to see how content editing in the Contentful web app works and how content changes propagate to this app.

Common setup
Clone the repo and install the dependencies.

git clone https://github.com/contentful/the-example-app.nodejs.git
cd the-example-app.nodejs
npm install
Steps for read-only access
To start the express server, run the following

npm run start:dev
Open http://localhost:3000 and take a look around.

Steps for read and write access (recommended)
Step 1: Install the Contentful CLI

Step 2: Login to Contentful through the CLI. It will help you to create a free account if you don't have one already.

contentful login
Step 3: Create a new space

contentful space create --name 'My space for the example app'
Step 4: Seed the new space with the example content model the-example-app. Replace the SPACE_ID with the id returned from the create command executed in step 3

contentful space seed -s '<SPACE_ID>' -t the-example-app
Step 5: Head to the Contentful web app's API section and grab SPACE_ID, DELIVERY_ACCESS_TOKEN, PREVIEW_ACCESS_TOKEN.

Step 6: Open variables.env and inject your credentials so it looks like this

NODE_ENV=development
CONTENTFUL_SPACE_ID=<SPACE_ID>
CONTENTFUL_DELIVERY_TOKEN=<DELIVERY_ACCESS_TOKEN>
CONTENTFUL_PREVIEW_TOKEN=<PREVIEW_ACCESS_TOKEN>
PORT=3000
Step 7: To start the express server, run the following

npm run start:dev
Final Step:

Open http://localhost:3000?editorial_features=enabled and take a look around. This URL flag adds an “Edit” button in the app on every editable piece of content which will take you back to Contentful web app where you can make changes. It also adds “Draft” and “Pending Changes” status indicators to all content if relevant.

Deploy to Heroku
You can also deploy this app to Heroku:

Deploy

Use Docker
You can also run this app as a Docker container:

Step 1: Clone the repo

git clone https://github.com/contentful/the-example-app.nodejs.git
Step 2: Build the Docker image

docker build -t the-example-app.nodejs .
Step 3: Run the Docker container locally:

docker run -p 3000:3000 -d the-example-app.nodejs
If you created your own Contentful space, you can use it by overriding the following environment variables:

docker run -p 3000:3000 \
  -e CONTENTFUL_SPACE_ID=<SPACE_ID> \
  -e CONTENTFUL_DELIVERY_TOKEN=<DELIVERY_ACCESS_TOKEN> \
  -e CONTENTFUL_PREVIEW_TOKEN=<PREVIEW_ACCESS_TOKEN> \
  -d the-example-app.nodejs