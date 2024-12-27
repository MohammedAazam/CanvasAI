# CanvasAI

CanvasAI is an intelligent canvas application inspired by Apple's MathNotes. It allows users to input equations or notes directly on a canvas and processes them using the Gemini API to provide real-time results. Additionally, CanvasAI generates a caption for the hand drawing on the canvas

---

## Features

- **Interactive Canvas:** Draw or sketch or write equations and notes intuitively.
- **Gemini API Integration:** Provides accurate responses for mathematical and scientific queries.
- **Modern UI:** Clean, responsive design powered by TailwindCSS and ShadCN.

---

## Tech Stack

- **Frontend:** Next.js, TailwindCSS, ShadCN
- **Backend:** Node JS
- **API Integration:** Gemini API
- **Database:** Supabase

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/canvas-ai.git
   cd canvas-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   NEXT_PUBLIC_API_KEY=your_gemini_api_key
   BACKEND_URL=http://localhost:8080
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Run the backend:
   - Navigate to the backend directory.
   - Run the application using your IDE or `npm run dev`.

---

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the canvas to write or draw equations.
---

## Folder Structure


## API Endpoints

**Frontend:**
- `/`: Main canvas page
- `/collaborate/:sessionId`: Collaboration page

**Backend:**
- `POST /api/solve`: Processes input equations via Gemini API.
- `GET /api/collaborate/:sessionId`: Fetch collaboration data.

---

## Contributions

We welcome contributions! To get started:
1. Fork this repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Contact

For questions or feedback, please contact us at **your-email@example.com**.
