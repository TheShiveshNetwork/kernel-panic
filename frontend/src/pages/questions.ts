export interface QuizQuestion {
    question: string;
    options: { text: string; impact: { health: number; happiness: number; money: number } }[];
}

export const quizQuestions: QuizQuestion[] = [
    {
        question: "You skipped breakfast to save time for work. How do you proceed?",
        options: [
            { text: "1. Grab a quick snack later.", impact: { health: 5, happiness: 0, money: -5 } },
            { text: "2. Work through hunger.", impact: { health: -10, happiness: -5, money: 0 } },
            { text: "3. Take time to eat a proper meal.", impact: { health: 10, happiness: 5, money: -15 } },
        ],
    },
    {
        question: "You receive an unexpected bonus at work. What do you do?",
        options: [
            { text: "1. Save it for the future.", impact: { health: 0, happiness: 5, money: 20 } },
            { text: "2. Splurge on a vacation.", impact: { health: 5, happiness: 15, money: -30 } },
            { text: "3. Donate part of it to charity.", impact: { health: 0, happiness: 10, money: -10 } },
        ],
    },
    {
        question: "A gym membership costs $50 a month. How do you proceed?",
        options: [
            { text: "1. Invest in the membership.", impact: { health: 10, happiness: 5, money: -50 } },
            { text: "2. Work out at home for free.", impact: { health: 5, happiness: 2, money: 0 } },
            { text: "3. Skip exercising altogether.", impact: { health: -10, happiness: -5, money: 0 } },
        ],
    },
    {
        question: "You have been invited to a party but feel tired. What do you do?",
        options: [
            { text: "1. Go to the party.", impact: { health: -5, happiness: 10, money: -10 } },
            { text: "2. Stay home and rest.", impact: { health: 10, happiness: -5, money: 0 } },
            { text: "3. Join for a short while.", impact: { health: 5, happiness: 5, money: -5 } },
        ],
    },
    {
        question: "You feel unwell but have an important deadline. What do you do?",
        options: [
            { text: "1. Push through and meet the deadline.", impact: { health: -15, happiness: -5, money: 20 } },
            { text: "2. Take a sick day to recover.", impact: { health: 15, happiness: 5, money: -10 } },
            { text: "3. Delegate the work.", impact: { health: 10, happiness: 0, money: -5 } },
        ],
    },
    {
        question: "Your friend needs financial help. How much do you offer?",
        options: [
            { text: "1. Lend a significant amount.", impact: { health: 0, happiness: 15, money: -30 } },
            { text: "2. Lend a small amount.", impact: { health: 0, happiness: 5, money: -10 } },
            { text: "3. Decline to lend money.", impact: { health: 0, happiness: -5, money: 0 } },
        ],
    },
    {
        question: "You are feeling bored at home. What do you do?",
        options: [
            { text: "1. Go for a hike.", impact: { health: 10, happiness: 10, money: -10 } },
            { text: "2. Watch TV at home.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "3. Go shopping.", impact: { health: 0, happiness: 10, money: -20 } },
        ],
    },
    {
        question: "You missed your morning workout. How do you compensate?",
        options: [
            { text: "1. Go for an evening run.", impact: { health: 10, happiness: 5, money: 0 } },
            { text: "2. Skip it for the day.", impact: { health: -5, happiness: -2, money: 0 } },
            { text: "3. Do a home workout instead.", impact: { health: 7, happiness: 3, money: 0 } },
        ],
    },
    {
        question: "You're at a restaurant, and the food takes too long. How do you react?",
        options: [
            { text: "1. Politely ask the waiter about the delay.", impact: { health: 0, happiness: 0, money: 0 } },
            { text: "2. Leave without paying.", impact: { health: 0, happiness: -10, money: -15 } },
            { text: "3. Stay patient and enjoy the ambiance.", impact: { health: 0, happiness: 5, money: 0 } },
        ],
    },
    {
        question: "You're feeling stressed at work. How do you handle it?",
        options: [
            { text: "1. Take a break and go for a walk.", impact: { health: 5, happiness: 5, money: 0 } },
            { text: "2. Power through and ignore the stress.", impact: { health: -10, happiness: -5, money: 0 } },
            { text: "3. Talk to a colleague about it.", impact: { health: 0, happiness: 5, money: 0 } },
        ],
    },
    {
        question: "You find an old item in your closet. What do you do?",
        options: [
            { text: "1. Donate it to charity.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "2. Sell it online.", impact: { health: 0, happiness: 0, money: 10 } },
            { text: "3. Throw it away.", impact: { health: 0, happiness: -2, money: 0 } },
        ],
    },
    {
        question: "You're considering taking a short trip. What do you do?",
        options: [
            { text: "1. Go on the trip and relax.", impact: { health: 10, happiness: 15, money: -50 } },
            { text: "2. Stay at home and work.", impact: { health: -5, happiness: -10, money: 0 } },
            { text: "3. Postpone the trip for later.", impact: { health: 0, happiness: 0, money: 0 } },
        ],
    },
    {
        question: "You receive a compliment at work. How do you respond?",
        options: [
            { text: "1. Thank them and smile.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "2. Humble-brag about your achievements.", impact: { health: 0, happiness: 10, money: 0 } },
            { text: "3. Ignore the compliment.", impact: { health: 0, happiness: -5, money: 0 } },
        ],
    },
    {
        question: "You need to prepare dinner, but you’re out of groceries. What do you do?",
        options: [
            { text: "1. Order food delivery.", impact: { health: 0, happiness: 5, money: -20 } },
            { text: "2. Go grocery shopping.", impact: { health: 5, happiness: 2, money: -30 } },
            { text: "3. Make do with what's available at home.", impact: { health: 5, happiness: 0, money: -10 } },
        ],
    },
    {
        question: "You have a bad day at work. How do you unwind?",
        options: [
            { text: "1. Watch a movie.", impact: { health: 0, happiness: 10, money: -5 } },
            { text: "2. Take a long bath.", impact: { health: 5, happiness: 5, money: -2 } },
            { text: "3. Call a friend and vent.", impact: { health: 0, happiness: 5, money: 0 } },
        ],
    },
    {
        question: "You see a street performer playing music. What do you do?",
        options: [
            { text: "1. Stop and listen for a while.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "2. Walk by without stopping.", impact: { health: 0, happiness: 0, money: 0 } },
            { text: "3. Give them a tip.", impact: { health: 0, happiness: 10, money: -5 } },
        ],
    },
    {
        question: "You’re running late for an important meeting. How do you react?",
        options: [
            { text: "1. Rush to the meeting as fast as possible.", impact: { health: -10, happiness: -5, money: 0 } },
            { text: "2. Call ahead and explain the delay.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "3. Skip the meeting and reschedule.", impact: { health: 0, happiness: -10, money: -20 } },
        ],
    },
    {
        question: "You’re feeling anxious about an upcoming presentation. How do you deal with it?",
        options: [
            { text: "1. Practice more and prepare thoroughly.", impact: { health: 0, happiness: 10, money: 0 } },
            { text: "2. Take a moment to relax and breathe.", impact: { health: 5, happiness: 5, money: 0 } },
            { text: "3. Postpone the presentation.", impact: { health: 0, happiness: -10, money: -10 } },
        ],
    },
    {
        question: "You feel like taking up a new hobby. What do you choose?",
        options: [
            { text: "1. Start painting.", impact: { health: 5, happiness: 10, money: -20 } },
            { text: "2. Learn to play a musical instrument.", impact: { health: 5, happiness: 15, money: -30 } },
            { text: "3. Try cooking new dishes.", impact: { health: 10, happiness: 10, money: -10 } },
        ],
    },
    {
        question: "You receive an invitation to a weekend getaway with friends. What do you do?",
        options: [
            { text: "1. Go on the trip and enjoy.", impact: { health: 10, happiness: 15, money: -50 } },
            { text: "2. Stay home and relax.", impact: { health: 5, happiness: 5, money: 0 } },
            { text: "3. Skip the trip to save money.", impact: { health: 0, happiness: -5, money: 10 } },
        ],
    },
    {
        question: "You’re planning to redecorate your room. What’s your budget?",
        options: [
            { text: "1. Go for a luxurious makeover.", impact: { health: 0, happiness: 10, money: -100 } },
            { text: "2. Redecorate with minimal spending.", impact: { health: 0, happiness: 5, money: -30 } },
            { text: "3. Skip the redecoration altogether.", impact: { health: 0, happiness: -5, money: 0 } },
        ],
    },
    {
        question: "You want to make a positive impact on the environment. What do you do?",
        options: [
            { text: "1. Start using sustainable products.", impact: { health: 5, happiness: 10, money: -20 } },
            { text: "2. Reduce your waste at home.", impact: { health: 10, happiness: 15, money: 0 } },
            { text: "3. Invest in eco-friendly habits.", impact: { health: 10, happiness: 15, money: -30 } },
        ],
    },
    {
        question: "You’ve been invited to a family gathering. How do you react?",
        options: [
            { text: "1. Attend the gathering with enthusiasm.", impact: { health: 5, happiness: 10, money: 0 } },
            { text: "2. Attend reluctantly.", impact: { health: 0, happiness: -5, money: 0 } },
            { text: "3. Skip the gathering to relax at home.", impact: { health: 10, happiness: 5, money: 0 } },
        ],
    },
    {
        question: "You’re offered a promotion at work but it requires more responsibility. What do you do?",
        options: [
            { text: "1. Accept the promotion.", impact: { health: -5, happiness: 10, money: 50 } },
            { text: "2. Decline the promotion for now.", impact: { health: 5, happiness: 0, money: 0 } },
            { text: "3. Negotiate for a better work-life balance.", impact: { health: 5, happiness: 5, money: 10 } },
        ],
    },
    {
        question: "You're feeling overwhelmed with your workload. What do you do?",
        options: [
            { text: "1. Prioritize and delegate tasks.", impact: { health: 10, happiness: 5, money: 0 } },
            { text: "2. Work harder and push through.", impact: { health: -10, happiness: -5, money: 0 } },
            { text: "3. Take a break to clear your mind.", impact: { health: 5, happiness: 10, money: 0 } },
        ],
    },
];
