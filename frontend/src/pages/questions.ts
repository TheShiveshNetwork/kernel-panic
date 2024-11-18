export interface QuizQuestion {
    question: string;
    options: { text: string; impact: { health: number; happiness: number; money: number } }[]; 
}

export const quizQuestions: QuizQuestion[] = [
    {
        question: "You're waking up on a typical weekday morning. How do you feel about the day ahead?",
        options: [
            { text: "1. Excited for the opportunities!", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "2. Feeling a bit overwhelmed but determined.", impact: { health: -5, happiness: -5, money: 0 } },
            { text: "3. Dreading the work ahead.", impact: { health: -10, happiness: -10, money: 0 } },
        ],
    },
    {
        question: "You’ve just arrived at work and are assigned a team project. What’s your approach to this task?",
        options: [
            { text: "1. Take charge and lead the team.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "2. Collaborate and share the work equally.", impact: { health: 5, happiness: 10, money: 0 } },
            { text: "3. Let someone else take charge.", impact: { health: 0, happiness: 0, money: 0 } },
        ],
    },
    {
        question: "During a break, you spot a colleague struggling with a personal issue. What do you do?",
        options: [
            { text: "1. Offer support and listen to them.", impact: { health: 5, happiness: 10, money: 0 } },
            { text: "2. Ignore and focus on your own task.", impact: { health: 0, happiness: -5, money: 0 } },
            { text: "3. Politely acknowledge and move on.", impact: { health: 0, happiness: 0, money: 0 } },
        ],
    },
    {
        question: "After work, you get a gift card worth $100. How do you spend it?",
        options: [
            { text: "1. Buy something you need.", impact: { health: 0, happiness: 5, money: -20 } },
            { text: "2. Save it for a rainy day.", impact: { health: 0, happiness: 0, money: 20 } },
            { text: "3. Treat yourself to something you want.", impact: { health: 0, happiness: 10, money: -30 } },
        ],
    },
    {
        question: "You get invited to an expensive restaurant. How do you respond?",
        options: [
            { text: "1. Go and enjoy the experience.", impact: { health: 0, happiness: 10, money: -25 } },
            { text: "2. Politely decline and suggest a cheaper alternative.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "3. Go but keep the spending minimal.", impact: { health: 0, happiness: 5, money: -15 } },
        ],
    },
    {
        question: "Later that evening, you’re feeling stressed and overwhelmed. What’s your coping strategy?",
        options: [
            { text: "1. Take a mental health day the next morning.", impact: { health: 15, happiness: 5, money: -10 } },
            { text: "2. Power through and ignore the stress.", impact: { health: -10, happiness: -5, money: 0 } },
            { text: "3. Talk to your manager about a lighter workload.", impact: { health: 5, happiness: 5, money: 0 } },
        ],
    },
    {
        question: "You’ve got a free weekend coming up. What will you do?",
        options: [
            { text: "1. Relax and do nothing.", impact: { health: 10, happiness: 5, money: 0 } },
            { text: "2. Explore a new hobby.", impact: { health: 5, happiness: 15, money: -5 } },
            { text: "3. Go on a spontaneous trip.", impact: { health: 0, happiness: 20, money: -30 } },
        ],
    },
    {
        question: "You’ve been feeling burnt out recently. A new opportunity comes up. How do you react?",
        options: [
            { text: "1. Take the opportunity for more flexibility (remote work).", impact: { health: 5, happiness: 10, money: 0 } },
            { text: "2. Decline, preferring the comfort of your current routine.", impact: { health: 0, happiness: 0, money: 0 } },
            { text: "3. Negotiate for a hybrid arrangement to balance both.", impact: { health: 5, happiness: 5, money: 0 } },
        ],
    },
    {
        question: "A colleague asks you to collaborate on a new product. What’s your next move?",
        options: [
            { text: "1. Take it on and work hard to make it successful.", impact: { health: 0, happiness: 10, money: 10 } },
            { text: "2. Negotiate better terms before agreeing.", impact: { health: 5, happiness: 5, money: 0 } },
            { text: "3. Decline and focus on your current projects.", impact: { health: 0, happiness: -5, money: 0 } },
        ],
    },
    {
        question: "At the end of the week, you reflect on your journey so far. How do you feel?",
        options: [
            { text: "1. Proud of the choices I made and excited for the future.", impact: { health: 10, happiness: 20, money: 0 } },
            { text: "2. A bit overwhelmed but satisfied with what I accomplished.", impact: { health: 0, happiness: 10, money: 0 } },
            { text: "3. Regretful, wishing I had made different decisions.", impact: { health: -10, happiness: -10, money: 0 } },
        ],
    },
    {
        question: "You’ve been invited to a networking event. How do you feel about it?",
        options: [
            { text: "1. Excited to meet new people and make connections.", impact: { health: 0, happiness: 10, money: 0 } },
            { text: "2. Reluctant, but decide to go anyway for career growth.", impact: { health: -5, happiness: 0, money: 0 } },
            { text: "3. Decline the invitation to relax at home.", impact: { health: 10, happiness: -5, money: 0 } },
        ],
    },
    {
        question: "Your friend asks for help with a major life decision. How do you support them?",
        options: [
            { text: "1. Offer practical advice and guidance.", impact: { health: 5, happiness: 10, money: 0 } },
            { text: "2. Just listen and let them figure it out on their own.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "3. Give them a loan to help with their decision.", impact: { health: 0, happiness: 0, money: -50 } },
        ],
    },
    {
        question: "You’re offered a promotion at work. What do you do?",
        options: [
            { text: "1. Accept it for the new challenges and salary increase.", impact: { health: -10, happiness: 10, money: 50 } },
            { text: "2. Decline and keep your current role for work-life balance.", impact: { health: 5, happiness: 5, money: 0 } },
            { text: "3. Negotiate for a different work arrangement or benefits.", impact: { health: 5, happiness: 5, money: 0 } },
        ],
    },
    {
        question: "You’re at a crossroads in your career. What’s your next move?",
        options: [
            { text: "1. Change careers to pursue your passion.", impact: { health: 10, happiness: 20, money: -30 } },
            { text: "2. Stick with your current job for stability.", impact: { health: 0, happiness: 5, money: 20 } },
            { text: "3. Take a break and travel to clear your mind.", impact: { health: 5, happiness: 15, money: -20 } },
        ],
    },
    {
        question: "You’ve just received a bill that’s a bit more than you expected. What do you do?",
        options: [
            { text: "1. Pay the bill immediately to avoid stress.", impact: { health: 0, happiness: -5, money: -20 } },
            { text: "2. Delay payment and review your finances.", impact: { health: -5, happiness: -5, money: 0 } },
            { text: "3. Contact the service provider to negotiate a lower charge.", impact: { health: 0, happiness: 5, money: 0 } },
        ],
    },
    {
        question: "You’ve been invited to a reunion. How do you prepare for it?",
        options: [
            { text: "1. Go and reconnect with old friends.", impact: { health: 5, happiness: 15, money: 0 } },
            { text: "2. Avoid it, preferring to focus on current relationships.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "3. Go, but only to catch up on professional opportunities.", impact: { health: 0, happiness: 0, money: 0 } },
        ],
    },
    {
        question: "You’ve started a new fitness regimen. How’s it going so far?",
        options: [
            { text: "1. Feeling great! It's boosting my energy and mood.", impact: { health: 15, happiness: 10, money: 0 } },
            { text: "2. Struggling, but determined to keep going.", impact: { health: -5, happiness: 5, money: 0 } },
            { text: "3. Giving up, it’s too hard to keep up with.", impact: { health: -10, happiness: -5, money: 0 } },
        ],
    },
    {
        question: "A sudden opportunity to work abroad comes your way. What do you do?",
        options: [
            { text: "1. Take it for the adventure and experience.", impact: { health: 10, happiness: 15, money: 20 } },
            { text: "2. Decline, preferring the comfort of your home country.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "3. Negotiate terms that provide work-life balance and benefits.", impact: { health: 5, happiness: 10, money: 10 } },
        ],
    },
    {
        question: "You’re feeling great after a week of good habits. How do you continue the streak?",
        options: [
            { text: "1. Keep up with a balanced routine of work and rest.", impact: { health: 10, happiness: 10, money: 0 } },
            { text: "2. Go on a shopping spree to reward yourself.", impact: { health: 0, happiness: 5, money: -30 } },
            { text: "3. Treat yourself to a new hobby to stay motivated.", impact: { health: 5, happiness: 15, money: -20 } },
        ],
    },
    {
        question: "A new financial investment opportunity comes up. Do you take it?",
        options: [
            { text: "1. Take the risk, hoping for good returns.", impact: { health: 0, happiness: 0, money: 20 } },
            { text: "2. Decline, preferring to stick to safer savings options.", impact: { health: 0, happiness: 0, money: 5 } },
            { text: "3. Do thorough research and invest carefully.", impact: { health: 5, happiness: 5, money: 0 } },
        ],
    },
    {
        question: "You’re about to make a big decision. How do you approach it?",
        options: [
            { text: "1. Take time to reflect and seek advice.", impact: { health: 5, happiness: 5, money: 0 } },
            { text: "2. Go with your gut feeling.", impact: { health: 0, happiness: 0, money: 0 } },
            { text: "3. Rush into the decision to get it over with.", impact: { health: -5, happiness: -5, money: 0 } },
        ],
    }
];
