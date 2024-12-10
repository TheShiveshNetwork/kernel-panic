export interface QuizQuestion {
    question: string;
    image: string;
    options: { text: string; impact: { health: number; happiness: number; money: number } }[]; 
}

export const quizQuestions: QuizQuestion[] = [
    {
        image: `
         \   |   /        
       '.  \ | /  .'
         '. * * .'
      --- *  O  * ---
         .' * * '.
       .'  / | \  '.
         /   |   \        
        `,
        question: "You're waking up on a typical weekday morning. How do you feel about the day ahead?",
        options: [
            { text: "1. Excited for the opportunities!", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "2. Feeling a bit overwhelmed but determined.", impact: { health: -5, happiness: -5, money: 0 } },
            { text: "3. Dreading the work ahead.", impact: { health: -10, happiness: -10, money: 0 } },
        ],
    },
    {
        image: `
                ___                ___                ___
             /       \          /       \          /       \
            |  O   O  |        |  O   O  |        |  O   O  |
            |    |    |        |    |    |        |    |    |
            |    _    |        |    _    |        |    _    |
             \_______/          \_______/          \_______/
                 |                  |                  |
                 |                  |                  |
               __|__              __|__              __|__
          | |         | |    | |         | |    | |         | |
          | |         | |    | |         | |    | |         | |
          ______________________________________________________    
        `,
        question: "You’ve just arrived at work and are assigned a team project. What’s your approach to this task?",
        options: [
            { text: "1. Take charge and lead the team.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "2. Collaborate and share the work equally.", impact: { health: 5, happiness: 10, money: 0 } },
            { text: "3. Let someone else take charge.", impact: { health: 0, happiness: 0, money: 0 } },
        ],
    },
    {
        image: `
                ___                ___          
             /       \          /       \       
            |  O   O  |        |  O   O  |      
            |    |    |        |    |    |      
            |    _    |        |    _    |      
             \_______/          \_______/       
                 |                  |           
                 |                  |           
               __|__              __|__         
          | |         | |    | |         | |    
          | |         | |    | |         | |    
          | |         | |    | |         | |    
          | |         | |    | |         | |     
          | |_________| |    | |_________| |    
               /   \              /   \          
              /     \            /     \         
             /       \          /       \        
            /_________\        /_________\          
        `,
        question: "During a break, you spot a colleague struggling with a personal issue. What do you do?",
        options: [
            { text: "1. Offer support and listen to them.", impact: { health: 5, happiness: 10, money: 0 } },
            { text: "2. Ignore and focus on your own task.", impact: { health: 0, happiness: -5, money: 0 } },
            { text: "3. Politely acknowledge and move on.", impact: { health: 0, happiness: 0, money: 0 } },
        ],
    },
    {
        image:`
         ___________________________
        |                           |
        |        GIFT CARD          |
        |                           |
        |  -----------------------  |
        |  | $$$$$$ 100.00 $$$$$$ | |
        |  -----------------------  |
        |                           |
        |   Valid Until: XX/XX/XXXX |
        |___________________________|
        `,
        question: "After work, you get a gift card worth $100. How do you spend it?",
        options: [
            { text: "1. Buy something you need.", impact: { health: 0, happiness: 5, money: -20 } },
            { text: "2. Save it for a rainy day.", impact: { health: 0, happiness: 0, money: 20 } },
            { text: "3. Treat yourself to something you want.", impact: { health: 0, happiness: 10, money: -30 } },
        ],
    },
    {
        image:`
                        __________
                     |              |
         __________  |   $$$$$$$$   |   __________
        |            |  FINE DINING |             |
        |    __      |  RESTAURANT  |      __     |
        |  |    |    |              |    |    |   |
        |  |    |    |  $$$$$$$$$$  |    |    |   |
        |  |____|    |  $$$$$$$$$$  |    |____|   |
        |____________|______________|_____________|
                    _____/      \_____
                   /                  \
                  /                    \
                 /                      \
                /                        \
               /                          \
        `,
        question: "You get invited to an expensive restaurant. How do you respond?",
        options: [
            { text: "1. Go and enjoy the experience.", impact: { health: 0, happiness: 10, money: -25 } },
            { text: "2. Politely decline and suggest a cheaper alternative.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "3. Go but keep the spending minimal.", impact: { health: 0, happiness: 5, money: -15 } },
        ],
    },
    {
        image:`
    SSSSS  TTTTT  RRRR   AAAAA  TTTTT  EEEEE  GGGG  Y     Y
    S        T    R   R  A   A    T    E      G      Y   Y
    SSSSS    T    RRRR   AAAAA    T    EEEE   G  GG   Y Y
        S    T    R  R   A   A    T    E      G   G    Y
    SSSSS    T    R   R  A   A    T    EEEEE  GGGG     Y

         
        `,
        question: "Later that evening, you’re feeling stressed and overwhelmed. What’s your coping strategy?",
        options: [
            { text: "1. Take a mental health day the next morning.", impact: { health: 15, happiness: 5, money: -10 } },
            { text: "2. Power through and ignore the stress.", impact: { health: -10, happiness: -5, money: 0 } },
            { text: "3. Talk to your manager about a lighter workload.", impact: { health: 5, happiness: 5, money: 0 } },
        ],
    },
    {
        image:`
                \ | /     
              --  o  --   
                / | \    
          ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
        ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
       ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
        ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
      ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     ~ ~ ~ ~  ~  ~  ~ ~ ~ ~ ~ ~    ~ ~ ~ ~ ~
       ~ ~ ~ ~  ~ ~ ~ ~ ~ ~ ~ ~  ~  ~  ~ ~ ~
     ~  ~ ~ ~  ~   ~  ~  ~ ~ ~ ~  ~ ~ ~ ~ ~ ~ ~
    ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
          ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
            ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
     ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
       ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
             |  |     |  |
            /    \   /    \
             |  |     |  |
             |  |     |  |
             |  |     |  |
             |  |     |  |
             |  |     |  |
             |__|     |__|
           
        `,
        question: "You’ve got a free weekend coming up. What will you do?",
        options: [
            { text: "1. Relax and do nothing.", impact: { health: 10, happiness: 5, money: 0 } },
            { text: "2. Explore a new hobby.", impact: { health: 5, happiness: 15, money: -5 } },
            { text: "3. Go on a spontaneous trip.", impact: { health: 0, happiness: 20, money: -30 } },
        ],
    },
    {
        image:`
        __________________
       |                  |
       |                  |
       |                  |
       |                  |
       |     DOOR TO      |
       |                  |
       |    OPPORTUNITY   |
       |                _ |
       |               |_||
       |                  |
       |                  |
       |                  |
       |                  |
       |__________________|
        `,
        question: "You’ve been feeling burnt out recently. A new opportunity comes up. How do you react?",
        options: [
            { text: "1. Take the opportunity for more flexibility (remote work).", impact: { health: 5, happiness: 10, money: 0 } },
            { text: "2. Decline, preferring the comfort of your current routine.", impact: { health: 0, happiness: 0, money: 0 } },
            { text: "3. Negotiate for a hybrid arrangement to balance both.", impact: { health: 5, happiness: 5, money: 0 } },
        ],
    },
    {
        image:`
          
                     ________                      
                    /        \                
                    |Product |           
                    | Launch?|            
                    |        |             
                   /\________/ 
           .-'''-./
         .'       '.
        /           \
       |   O     O   |
       |      |      |
       |      _      |
        \           /
         '._._._._.'
           /     \
          /       \
         /         \
        /___________\
        `,
        question: "A colleague asks you to collaborate on a new product. What’s your next move?",
        options: [
            { text: "1. Take it on and work hard to make it successful.", impact: { health: 0, happiness: 10, money: 10 } },
            { text: "2. Negotiate better terms before agreeing.", impact: { health: 5, happiness: 5, money: 0 } },
            { text: "3. Decline and focus on your current projects.", impact: { health: 0, happiness: -5, money: 0 } },
        ],
    },
    {
        image:`
            :-)           :-|           :-(
            ___           ___           ___
         /       \     /       \     /       \
        |  O   O  |   |  O   O  |   |  O   O  |
        |    ^    |   |    ^    |   |    ^    |
        |   ---   |   |   ---   |   |   ---   |
        \_________/   \_________/   \_________/
             |             |             |
          '--'--'       '--'--'       '--'--'
        `,
        question: "At the end of the week, you reflect on your journey so far. How do you feel?",
        options: [
            { text: "1. Proud of the choices I made and excited for the future.", impact: { health: 10, happiness: 20, money: 0 } },
            { text: "2. A bit overwhelmed but satisfied with what I accomplished.", impact: { health: 0, happiness: 10, money: 0 } },
            { text: "3. Regretful, wishing I had made different decisions.", impact: { health: -10, happiness: -10, money: 0 } },
        ],
    },
    {
        image:`
        _________________________________
        |                               |
        |     YOU'RE INVITED TO         |
        |                               |
        |     A NETWORKING EVENT        |
        |                               |
        |   Join us for an evening of   |
        |   connection, collaboration,  |
        |   and growth!                 |
        |                               |
        |   Date: [Event Date]          |
        |   Time: [Event Time]          |
        |   Location: [Event Venue]     |
        |                               |
        |   RSVP by: [RSVP Date]        |
        |                               |
        |_______________________________|
        `,
        question: "You’ve been invited to a networking event. How do you feel about it?",
        options: [
            { text: "1. Excited to meet new people and make connections.", impact: { health: 0, happiness: 10, money: 0 } },
            { text: "2. Reluctant, but decide to go anyway for career growth.", impact: { health: -5, happiness: 0, money: 0 } },
            { text: "3. Decline the invitation to relax at home.", impact: { health: 10, happiness: -5, money: 0 } },
        ],
    },
    {
        image:`
                     ________                      
                    /        \                
                    |WHAT TO |           
                    |   DO?  |            
                    |        |             
                   /\________/ 
           .-'''-./
         .'       '.
        /           \
       |   O     O   |
       |      |      |
       |      _      |
        \           /
         '._._._._.'
           /     \
          /       \
         /         \
        /___________\ 
          
        `,
        question: "Your friend asks for help with a major life decision. How do you support them?",
        options: [
            { text: "1. Offer practical advice and guidance.", impact: { health: 5, happiness: 10, money: 0 } },
            { text: "2. Just listen and let them figure it out on their own.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "3. Give them a loan to help with their decision.", impact: { health: 0, happiness: 0, money: -50 } },
        ],
    },
    {
        image:`
                   ___
                /       \
               |   O O   |
               |    ^    |
               |   ---   |
                \_______/
                    |
                    |
                   / \
                  /   \
                 /     \
                /       \
            ____|_______|____
         /                     \
        |   CONGRATULATIONS!    |
        |  WE ARE OFFERING YOU  |
        |     A PROMOTION       |
        |_______________________|
        `,
        question: "You’re offered a promotion at work. What do you do?",
        options: [
            { text: "1. Accept it for the new challenges and salary increase.", impact: { health: -10, happiness: 10, money: 50 } },
            { text: "2. Decline and keep your current role for work-life balance.", impact: { health: 5, happiness: 5, money: 0 } },
            { text: "3. Negotiate for a different work arrangement or benefits.", impact: { health: 5, happiness: 5, money: 0 } },
        ],
    },
    {
        image:`
             /\
            /  \
           /    \
          /      \
         /        \
  Path 1   Path 2   Path 3
     \        |        /
      \       |       /
       \______|______/
              |
              O
             \|/
              |
             / \
        `,
        question: "You’re at a crossroads in your career. What’s your next move?",
        options: [
            { text: "1. Change careers to pursue your passion.", impact: { health: 10, happiness: 20, money: -30 } },
            { text: "2. Stick with your current job for stability.", impact: { health: 0, happiness: 5, money: 20 } },
            { text: "3. Take a break and travel to clear your mind.", impact: { health: 5, happiness: 15, money: -20 } },
        ],
    },
    {
        image:`
        ________________
     |                    |
     |      INVOICE       |
     |--------------------|
     | Item       | Price |
     |--------------------|
     | Product A  | $500  |
     | Product B  | $300  |
     | Service X  | $200  |
     |--------------------|
     | TOTAL      | $1000 |
     |--------------------|
     |    PAYMENT DUE     |
     |____________________|
             \    /
              \  /
               \/
    !!!!WOW THAT'S A LOT!!!!
        `,
        question: "You’ve just received a bill that’s a bit more than you expected. What do you do?",
        options: [
            { text: "1. Pay the bill immediately to avoid stress.", impact: { health: 0, happiness: -5, money: -20 } },
            { text: "2. Delay payment and review your finances.", impact: { health: -5, happiness: -5, money: 0 } },
            { text: "3. Contact the service provider to negotiate a lower charge.", impact: { health: 0, happiness: 5, money: 0 } },
        ],
    },
    {
        "image": ` 
        RRRR   EEEEE  U   U  N   N  III   OOO   N   N
        R   R  E      U   U  NN  N   I   O   O  NN  N
        RRRR   EEEE   U   U  N N N   I   O   O  N N N
        R  R   E      U   U  N  NN   I   O   O  N  NN
        R   R  EEEEE  UUUUU  N   N  III   OOO   N   N

        `,
        question: "You’ve been invited to a reunion. How do you prepare for it?",
        options: [
            { text: "1. Go and reconnect with old friends.", impact: { health: 5, happiness: 15, money: 0 } },
            { text: "2. Avoid it, preferring to focus on current relationships.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "3. Go, but only to catch up on professional opportunities.", impact: { health: 0, happiness: 0, money: 0 } },
        ],
    },
    {
        image:`
         EEEEE  X   X  EEEEE  RRRR    CCCC   III  SSSSS  EEEEE
         E       X X   E      R   R  C        I   S      E
         EEEE     X    EEEE   RRRR   C        I   SSSSS  EEEE
         E       X X   E      R  R   C        I       S  E
         EEEEE  X   X  EEEEE  R   R   CCCC   III  SSSSS  EEEEE

        `,
        question: "You’ve started a new fitness regimen. How’s it going so far?",
        options: [
            { text: "1. Feeling great! It's boosting my energy and mood.", impact: { health: 15, happiness: 10, money: 0 } },
            { text: "2. Struggling, but determined to keep going.", impact: { health: -5, happiness: 5, money: 0 } },
            { text: "3. Giving up, it’s too hard to keep up with.", impact: { health: -10, happiness: -5, money: 0 } },
        ],
    },
    {
        image:`
      _______
     /       \         _         _____
    /         \       | |       |     |
   |   Work    |      | |       |     |
   |   Abroad  |      | |       |     |
   |   Offer   |     /   \      |     |__
    \_________/     /     \     |        \  
        |          /  ___  \    |  O     |  
        |         /  /   \  \   |____    |   
        |        /  /     \  \  |     \   |  
        |       |  |       |  | |      \  |  
        |       |  |       |  | |       | |  
        |_______|__|_______|__|_|_______|_|

        `,
        question: "A sudden opportunity to work abroad comes your way. What do you do?",
        options: [
            { text: "1. Take it for the adventure and experience.", impact: { health: 10, happiness: 15, money: 20 } },
            { text: "2. Decline, preferring the comfort of your home country.", impact: { health: 0, happiness: 5, money: 0 } },
            { text: "3. Negotiate terms that provide work-life balance and benefits.", impact: { health: 5, happiness: 10, money: 10 } },
        ],
    },
    {
        image:`
         ________   Keep Going!      _____   Stay Positive!    _____
        |        | ---------------> |     | ----------------> |     |
        | You're |    Feeling       | Yes!|     Keep it up!   |GOAL!|
        | on top!|    Great!        |     |                   |     |
        |________|                  |_____|                   |_____|

   
        `,
        question: "You’re feeling great after a week of good habits. How do you continue the streak?",
        options: [
            { text: "1. Keep up with a balanced routine of work and rest.", impact: { health: 10, happiness: 10, money: 0 } },
            { text: "2. Go on a shopping spree to reward yourself.", impact: { health: 0, happiness: 5, money: -30 } },
            { text: "3. Treat yourself to a new hobby to stay motivated.", impact: { health: 5, happiness: 15, money: -20 } },
        ],
    },
    {
        image:`
         $$$$$$$$$$$
        $$         $$
       $$   INVEST  $$
      $$ OPPORTUNITY $$
     $$   COMES UP    $$ 
     $$    DO YOU     $$
      $$  TAKE IT?   $$
       $$           $$
        $$$$$$$$$$$$$
              |
     _________|__________
   /                     \
  |  YES      |       NO  |
  |  Take the |  Pass it  |
  |    Chance |  Up       |
  |___________|___________|
             / \
            /   \
           /     \
        $$$$$   $$$$$

        `,
        question: "A new financial investment opportunity comes up. Do you take it?",
        options: [
            { text: "1. Take the risk, hoping for good returns.", impact: { health: 0, happiness: 0, money: 20 } },
            { text: "2. Decline, preferring to stick to safer savings options.", impact: { health: 0, happiness: 0, money: 5 } },
            { text: "3. Do thorough research and invest carefully.", impact: { health: 5, happiness: 5, money: 0 } },
        ],
    },
    {
        image:`
    BBBBB   III  GGG       DDDD   EEEEE  CCCC  III  SSSSS  III   OOO   N   N
    B    B   I   G         D   D  E      C      I   S       I   O   O  NN  N
    BBBBB    I   G  GG     D   D  EEEE   C      I   SSSSS   I   O   O  N N N
    B    B   I   G   G     D   D  E      C      I       S   I   O   O  N  NN
    BBBBB   III  GGGG      DDDD   EEEEE  CCCC  III  SSSSS  III   OOO   N   N
    `,
        question: "You’re about to make a big decision. How do you approach it?",
        options: [
            { text: "1. Take time to reflect and seek advice.", impact: { health: 5, happiness: 5, money: 0 } },
            { text: "2. Go with your gut feeling.", impact: { health: 0, happiness: 0, money: 0 } },
            { text: "3. Rush into the decision to get it over with.", impact: { health: -5, happiness: -5, money: 0 } },
        ],
    },
    {
        image: `
        _______
       |       |
       | 100%  |
       |       |
       |SUCCESS|
       |_______|
      /         \
     /           \
    |             |
    |             |
    |   YOU DID   |
    |     IT!     |
     \           /
      \_________/
        `,
        question: "You successfully completed a major milestone in your project. How do you celebrate?",
        options: [
            { text: "1. Throw a party for your team.", impact: { health: -5, happiness: 20, money: -30 } },
            { text: "2. Take a day off to relax.", impact: { health: 10, happiness: 10, money: 0 } },
            { text: "3. Treat yourself to something special.", impact: { health: 0, happiness: 15, money: -20 } },
        ],
    },
    {
        image: `
                .--.         
               |o_o |      
               |\_/ |     SO TIRED :/
               /   \    
            ( |     | )
            /'\_   _/'\
            \___)=(___/ 

        `,
        question: "It’s late at night, and you’ve been working on a problem for hours. What do you do?",
        options: [
            { text: "1. Keep working until you solve it.", impact: { health: -10, happiness: -5, money: 0 } },
            { text: "2. Sleep and tackle it in the morning.", impact: { health: 10, happiness: 5, money: 0 } },
            { text: "3. Ask for help from a colleague or friend.", impact: { health: 5, happiness: 10, money: 0 } },
        ],
    },
    {
        image: `
        ***************
        * Vacay Time  *
        ***************
          \         /
           \_______/
           /       \
          /         \
         /___________\
        `,
        question: "You’ve earned some vacation days. How do you spend them?",
        options: [
            { text: "1. Go on an international trip.", impact: { health: 0, happiness: 20, money: -50 } },
            { text: "2. Take a staycation to recharge.", impact: { health: 10, happiness: 10, money: 0 } },
            { text: "3. Volunteer for a cause you care about.", impact: { health: 5, happiness: 15, money: 0 } },
        ],
    },
    {
        image: `
      ~~~~~
     /     \
    |       |
    |  $$$  |
    |       |
     \_____/
      ~~~~~
        `,
        question: "You receive an unexpected cash bonus. What do you do?",
        options: [
            { text: "1. Save it for future expenses.", impact: { health: 0, happiness: 5, money: 30 } },
            { text: "2. Invest in a side project or stocks.", impact: { health: 0, happiness: 10, money: 20 } },
            { text: "3. Spend it on a luxury item.", impact: { health: 0, happiness: 15, money: -30 } },
        ],
    },
    {
        image: `
       (\_/)
       (O.o)
       (> <)  
      Bunny Time!
        `,
        question: "Your pet is seeking attention while you’re busy. What do you do?",
        options: [
            { text: "1. Take a break to play with them.", impact: { health: 5, happiness: 15, money: 0 } },
            { text: "2. Continue working and ignore them for now.", impact: { health: -5, happiness: -5, money: 0 } },
            { text: "3. Ask someone else to care for them temporarily.", impact: { health: 0, happiness: 5, money: -5 } },
        ],
    },
    {
        image: `
        \o/
         |
        / \
   Time for Fitness!
        `,
        question: "A friend invites you to join a fitness class. What do you do?",
        options: [
            { text: "1. Join and commit to regular sessions.", impact: { health: 15, happiness: 10, money: -10 } },
            { text: "2. Try it out but don’t commit.", impact: { health: 5, happiness: 5, money: -5 } },
            { text: "3. Decline and stick to your own routine.", impact: { health: 0, happiness: 0, money: 0 } },
        ],
    },
    {
        image: `
         ______
        |      |
        | Game |
        | Night|
        |______|
        `,
        question: "Your friends are hosting a game night. How do you participate?",
        options: [
            { text: "1. Go all in and try to win!", impact: { health: 0, happiness: 15, money: 0 } },
            { text: "2. Play casually and have fun.", impact: { health: 0, happiness: 10, money: 0 } },
            { text: "3. Skip it to focus on personal tasks.", impact: { health: 0, happiness: -5, money: 0 } },
        ],
    },
    {
        image: `
       AAAAA   RRRR   TTTTT
       A   A   R   R    T
       AAAAA   RRRR     T
       A   A   R  R     T
       A   A   R   R    T

        `,
        question: "You discover a local art workshop. How do you engage?",
        options: [
            { text: "1. Sign up and explore your creativity.", impact: { health: 5, happiness: 20, money: -15 } },
            { text: "2. Attend as an observer.", impact: { health: 0, happiness: 10, money: -5 } },
            { text: "3. Skip it and pursue other interests.", impact: { health: 0, happiness: 0, money: 0 } },
        ],
    },
    {
        image: `
     _____
    /_/|\_\
   |_|_|_|_|
   |_|_|_|_|
   |_|_|_|_|
   |_|_|_|_|     MIC DROP!
    \_\|/_/
      |||
      |||
      |||
      |||
      |||
    __|||__
   |_______|

        `,
        question: "You’re invited to karaoke. How do you respond?",
        options: [
            { text: "1. Sing your heart out.", impact: { health: 0, happiness: 15, money: 0 } },
            { text: "2. Cheer for others and enjoy the event.", impact: { health: 0, happiness: 10, money: 0 } },
            { text: "3. Avoid it and focus on your hobbies.", impact: { health: 0, happiness: -5, money: 0 } },
        ],
    }
];


