![image](https://github.com/user-attachments/assets/6ec1e830-fd00-4156-895c-0a19e3850313)


## 💡 Inspiration
> Our inspiration for *Carried On* was the desire to create a fast and convenient service that supports travelers hoping to pack efficiently and confidently by leveraging AI technology to streamline the packing process and help them navigate travel guidelines.

## ✨ What is *Carried On*?
> *Carried On* provides a website platform where travelers can upload images of their luggage, and our AI system, powered by OpenAI's GPT-4o, detects the items inside. With this, users can receive packing suggestions and guidance based on TSA Guidelines, while also benefiting from an AI chatbot that helps answer questions and navigate nuances of TSA regulations, and more.

## ⚒️ How we built it
> We built *Carried On* using **Next.js**, a framework for creating server-rendered React websites, **Tailwind CSS**, a CSS framework with many pre-designed utility classes that can be used to build robust UIs, **Auth0**, an identity and access management (IAM) platform used for authentication and authorization, **.Tech Domains**, **OpenAI API** for robust image detection and chatbot functionality, **Arize Phoenix** for monitoring and optimization of our AI-driven application, **TypeScript** for static typing in JavaScript, and **Vercel**, a cloud platform for deploying web applications.

## 💢 Challenging moments
> When using **Google Cloud Vision API**, we had challenges with accurately detecting and classifying items within luggage, especially with complex or partially obscured items, inspiring a switch to OpenAI's built-in Image Recognition capabiliites with GPT-4o. Additionally, integrating **OpenAI API** for chatbot functionality alongside utilizing live image detection required careful synchronization to ensure that the system could seamlessly provide relevant packing suggestions based on the detected items. We had a moment near 6am where all of the OpenAI API Credits that were provided to hackers got maxed out, hindering our development a bit. We decided to use ChatGPT to predict outputs and hold out on purchasing more credits to complete our project in the morning!

## 🥂 Accomplishments that we're proud of
> We are especially proud of our image detection functionality and UI/UX. With a live scan of objects or an uploaded image, we can detect lists of items with up too 100% accuracy and deliver equally accurate information on TSA guidelines. The interface represents a user-friendly and visually appealing design that makes packing and traveling more manageable. Login is seamlessly integrated with our system and the visual theme and cohesiveness support our application's primary purpose of helping users pack efficiently while offering clear, helpful advice through a fast, easy to navigate, AI-powered tool and assistant.

## 🧠 What we learned
> Throughout the challenges and successes that we faced with our hack, we learned a lot about the complexities of backend API integrations within the context of full-stack web applications. Working with the **OpenAI API** presented unique challenges in terms of data synchronization and ensuring smooth user experiences in the Next.js tech stack. Additionally, using **Arize Phoenix** to monitor the performance of our APIs and user interactions helped us troubleshoot and optimize the AI models. We also sharpened our skills working with **Next.js** and **Tailwind CSS** for building a responsive and user-friendly interface. Our experience with **Auth0** and managing authentication workflows further enhanced our backend integration skills.

## 🔮 What's next for *Carried On*?
> *Carried On* presents a novel way to assist travelers with packing by providing personalized recommendations and AI-driven packing suggestions. We hope to continue building out the features that make the packing process even easier, including implementing reminder systems that utilize ML to determine the best times of day to send unintrusive and convenient notifications. Additionally, we aim to expand the AI chatbot’s functionality to help users more effectively navigate TSA guidelines, pack more efficiently, and ensure that every travel item is in place.

