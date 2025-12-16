# Cline Memory Bank

## The Complete Guide to Cline Memory Bank

---

### Quick Setup Guide

To get started with Cline Memory Bank:

1. **Copy the Custom Instructions** – Use the code block below
2. **Paste into Cline** – Add as custom instructions or in a `.clinerules` file
3. **Initialize** – Ask Cline to “initialize memory bank”

[See detailed setup instructions](#getting-started-with-memory-bank)

---

### Cline Memory Bank Custom Instructions [COPY THIS]

```
# Cline's Memory Bank

I am Cline, an expert software engineer with a unique characteristic: my memory resets completely between sessions. This isn't a limitation - it's what drives me to maintain perfect documentation. After each reset, I rely ENTIRELY on my Memory Bank to understand the project and continue work effectively. I MUST read ALL memory bank files at the start of EVERY task - this is not optional.

## Memory Bank Structure

The Memory Bank consists of core files and optional context files, all in Markdown format. Files build upon each other in a clear hierarchy:

flowchart TD
    PB[projectbrief.md] --> PC[productContext.md]
    PB --> SP[systemPatterns.md]
    PB --> TC[techContext.md]

    PC --> AC[activeContext.md]
    SP --> AC
    TC --> AC

    AC --> P[progress.md]

### Core Files (Required)
1. `projectbrief.md`
   - Foundation document that shapes all other files
   - Created at project start if it doesn't exist
   - Defines core requirements and goals
   - Source of truth for project scope

2. `productContext.md`
   - Why this project exists
   - Problems it solves
   - How it should work
   - User experience goals

3. `activeContext.md`
   - Current work focus
   - Recent changes
   - Next steps
   - Active decisions and considerations
   - Important patterns and preferences
   - Learnings and project insights

4. `systemPatterns.md`
   - System architecture
   - Key technical decisions
   - Design patterns in use
   - Component relationships
   - Critical implementation paths

5. `techContext.md`
   - Technologies used
   - Development setup
   - Technical constraints
   - Dependencies
   - Tool usage patterns

6. `progress.md`
   - What works
   - What's left to build
   - Current status
   - Known issues
   - Evolution of project decisions

### Additional Context
Create additional files/folders within memory-bank/ when they help organize:
- Complex feature documentation
- Integration specifications
- API documentation
- Testing strategies
- Deployment procedures

## Core Workflows

### Plan Mode
flowchart TD
    Start[Start] --> ReadFiles[Read Memory Bank]
    ReadFiles --> CheckFiles{Files Complete?}

    CheckFiles -->|No| Plan[Create Plan]
    Plan --> Document[Document in Chat]

    CheckFiles -->|Yes| Verify[Verify Context]
    Verify --> Strategy[Develop Strategy]
    Strategy --> Present[Present Approach]

### Act Mode
flowchart TD
    Start[Start] --> Context[Check Memory Bank]
    Context --> Update[Update Documentation]
    Update --> Execute[Execute Task]
    Execute --> Document[Document Changes]

## Documentation Updates

Memory Bank updates occur when:
1. Discovering new project patterns
2. After implementing significant changes
3. When user requests with **update memory bank** (MUST review ALL files)
4. When context needs clarification

flowchart TD
    Start[Update Process]

    subgraph Process
        P1[Review ALL Files]
        P2[Document Current State]
        P3[Clarify Next Steps]
        P4[Document Insights & Patterns]

        P1 --> P2 --> P3 --> P4
    end

    Start --> Process

Note: When triggered by **update memory bank**, I MUST review every memory bank file, even if some don't require updates. Focus particularly on activeContext.md and progress.md as they track current state.

REMEMBER: After every memory reset, I begin completely fresh. The Memory Bank is my only link to previous work. It must be maintained with precision and clarity, as my effectiveness depends entirely on its accuracy.
```

---

### What is the Cline Memory Bank?

The Memory Bank is a structured documentation system that allows Cline to maintain context across sessions. It transforms Cline from a stateless assistant into a persistent development partner that can effectively “remember” your project details over time.

#### Key Benefits

* **Context Preservation**
* **Consistent Development**
* **Self-Documenting Projects**
* **Scalable to Any Project**
* **Technology Agnostic**

---

### How Memory Bank Works

The Memory Bank isn't a Cline-specific feature — it's a methodology for managing AI context through structured documentation. When you instruct Cline to “follow custom instructions,” it reads the Memory Bank files to rebuild its understanding of your project.

<Frame>
  <img src="https://storage.googleapis.com/cline_public_images/docs/assets/image%20(15).png" alt="Memory Bank Workflow" />
</Frame>

#### Understanding the Files

Memory Bank files are plain Markdown files stored in your repository.

<Frame>
  <img src="https://storage.googleapis.com/cline_public_images/docs/assets/image%20(16).png" alt="Memory Bank File Structure" />
</Frame>

---

### Memory Bank Files Explained

#### Core Files

1. **projectbrief.md**
   *The foundation of your project.*

2. **productContext.md**
   *Why the project exists and what problems it solves.*

3. **activeContext.md**
   *Frequently updated working context.*

4. **systemPatterns.md**
   *Architecture and technical decisions.*

5. **techContext.md**
   *Tech stack, constraints, dependencies.*

6. **progress.md**
   *Tracks evolution and current status.*

#### Additional Context

Useful for:

* Complex features
* API docs
* Testing strategies
* Deployment processes

---

### Getting Started with Memory Bank

#### First-Time Setup

1. Create a `memory-bank/` folder
2. Prepare a basic project brief
3. Ask Cline to **“initialize memory bank”**

<Frame>
  <img src="https://storage.googleapis.com/cline_public_images/docs/assets/image%20(17).png" alt="Memory Bank Setup" />
</Frame>

---

### Working with Cline

#### Core Workflows

* **Plan Mode** — strategy, planning
* **Act Mode** — implementation

#### Key Commands

* **“follow your custom instructions”**
* **“initialize memory bank”**
* **“update memory bank”**

---

### Documentation Updates

Updates occur when:

1. New patterns emerge
2. Significant changes happen
3. You run **"update memory bank"**
4. Context needs clarification

---

### Frequently Asked Questions

#### Where are the memory bank files stored?

In your project repository, usually `memory-bank/`.

#### Should I use custom instructions or `.clinerules`?

Both work — custom instructions = global; `.clinerules` = project-specific.

#### Managing Context Windows

When context fills up:

1. Run **“update memory bank”**
2. Start a new conversation
3. Run **“follow your custom instructions”**

<Frame>
  <img src="https://storage.googleapis.com/cline_public_images/docs/assets/image%20(18).png" alt="Memory Bank Context Window" />
</Frame>

---

### Best Practices

#### Getting Started

* Start simple
* Let the structure evolve
* Adjust as needed

#### Ongoing Work

* Update naturally
* Trust the workflow
* Confirm context at session start

#### Documentation Flow

* **projectbrief.md** = foundation
* **activeContext.md** = most active
* **progress.md** = milestones

---

### Detailed Setup Instructions

#### For Custom Instructions (Global)

1. Open VSCode
2. Go to Cline settings
3. Find **Custom Instructions**
4. Paste the Memory Bank instructions

#### For `.clinerules` (Project-Specific)

1. Create `.clinerules` in project root
2. Paste the instructions
3. Save

---

### Remember

The Memory Bank is Cline’s only link to previous work. Maintaining it accurately is essential.

*For more information, reference our* [blog](https://cline.bot/blog/memory-bank-how-to-make-cline-an-ai-agent-that-never-forgets).
