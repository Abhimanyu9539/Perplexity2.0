# Perplexity Clone - AI-Powered Search Interface

A full-stack application that replicates Perplexity AI's search and chat interface, featuring real-time streaming responses, web search capabilities, and a beautiful UI that shows search progress.

![Perplexity Clone Demo](https://img.shields.io/badge/Status-Active-green)
![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)

## 🚀 Features

- **Real-time Streaming Responses**: Watch AI responses appear character by character
- **Web Search Integration**: Powered by Tavily API for up-to-date information
- **Search Progress Visualization**: 
  - "Searching the web" with query display
  - "Reading" with URL analysis
  - "Writing answer" status
- **Conversation Memory**: Maintains context across messages using checkpoint IDs
- **Modern UI/UX**: Clean, Perplexity-inspired interface with dark mode support
- **Source Attribution**: Displays consulted sources with clickable links
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Search Progress Stages
The application shows three distinct stages during search:
1. **Searching the web** - Displays the search query
2. **Reading** - Shows URLs being analyzed
3. **Writing answer** - Indicates response generation

## 🛠️ Tech Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **LangChain** - LLM orchestration framework
- **LangGraph** - Stateful conversation management
- **OpenAI GPT-4** - Large language model
- **Tavily API** - Web search integration
- **Server-Sent Events (SSE)** - Real-time streaming

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **clsx** - Conditional className utility

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.8+
- OpenAI API key
- Tavily API key

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Perplexity2.0.git
cd perplexity-clone
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
```

Edit `.env` and add your API keys:
```env
OPENAI_API_KEY=your_openai_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
uvicorn app:app --reload --port 8000
```

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to use the application.

## 📁 Project Structure

```
perplexity-clone/
├── backend/
│   ├── app.py              # FastAPI application with LangGraph
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── globals.css
    │   └── components/
    │       ├── ChatInterface.tsx    # Main chat container
    │       ├── MessageList.tsx      # Message display
    │       ├── Message.tsx          # Individual message
    │       ├── MessageInput.tsx     # Input field
    │       ├── SearchStages.tsx     # Search progress indicator
    │       └── SearchIndicator.tsx  # Search animation
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.js
    └── tsconfig.json
```

## 🔑 Key Components

### Backend Components

- **LangGraph State Management**: Maintains conversation state across messages
- **Tool Integration**: Seamlessly integrates Tavily search tool
- **SSE Streaming**: Real-time response streaming to frontend
- **Date-Aware Context**: Ensures current date awareness for accurate searches

### Frontend Components

- **ChatInterface**: Main container managing state and SSE connection
- **SearchStages**: Visual progress indicator with three stages
- **Message**: Renders messages with search info and sources
- **MessageInput**: Auto-resizing input with keyboard shortcuts

## 🎯 API Endpoints

### `GET /chat_stream/{message}`
Streams chat responses via Server-Sent Events.

**Query Parameters:**
- `checkpoint_id` (optional): Session ID for conversation continuity

**Response Events:**
- `checkpoint`: New session ID for first message
- `content`: Streaming text content
- `search_start`: Search initiated with query
- `search_results`: URLs found during search
- `end`: Stream completion

## 🔄 How It Works

1. **User sends a message** → Displayed immediately in the UI
2. **Frontend connects to SSE endpoint** → Establishes streaming connection
3. **LLM decides if search is needed** → Uses tools for current information
4. **Search progress displayed** → Shows searching → reading → writing stages
5. **Response streams in real-time** → Character-by-character display
6. **Sources displayed** → Clickable links to consulted websites

## 🐛 Troubleshooting

### Common Issues

1. **CSS Errors**
   - Ensure `globals.css` uses only valid Tailwind classes
   - Check PostCSS configuration

2. **Import Errors**
   - Verify `tsconfig.json` has correct path aliases
   - Use relative imports if aliases fail

3. **Search Shows Old Dates**
   - Backend includes current date context
   - System prompt ensures date awareness

4. **CORS Issues**
   - Backend has CORS middleware configured
   - Ensure frontend uses correct API URL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Perplexity AI](https://www.perplexity.ai/)
- Built with [LangChain](https://langchain.com/) and [LangGraph](https://langchain-ai.github.io/langgraph/)
- Search powered by [Tavily](https://tavily.com/)
- UI components inspired by modern design principles

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Ensure API keys are correctly configured

---

Built with ❤️ using Next.js and FastAPI
