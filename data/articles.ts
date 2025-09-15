// Fix: Changed JSX to React.createElement to be valid in a .ts file.
import React from 'react';

export interface Author {
    name: string;
    bio: string;
    imageUrl: string;
}

export interface Article {
    slug: string;
    title: string;
    summary: string;
    author: Author;
    publishDate: string; // YYYY-MM-DD
    content: React.ReactNode;
}

const authors = {
    EVELYN_REED: {
        name: "Dr. Evelyn Reed",
        bio: "Dr. Evelyn Reed holds a Ph.D. in Psychology from Stanford University, specializing in human perception of time and memory. Her work explores the intersection of cognitive science and personal history.",
        imageUrl: "https://i.pravatar.cc/150?img=9"
    },
    JAMES_CARTER: {
        name: "James Carter",
        bio: "James Carter is a historian and genealogy enthusiast with over 20 years of experience in tracing family lineages. He is passionate about making historical research accessible to everyone.",
        imageUrl: "https://i.pravatar.cc/150?img=10"
    },
    SOFIA_CHEN: {
        name: "Sofia Chen",
        bio: "Sofia Chen is a writer and wellness advocate who explores alternative philosophies and systems of self-knowledge, including numerology, astrology, and ancient wisdom traditions.",
        imageUrl: "https://i.pravatar.cc/150?img=11"
    }
};


export const articles: Article[] = [
    {
        slug: 'deep-dive-into-numerology',
        title: 'A Deep Dive into Numerology and Your Life-Path Number',
        summary: 'Unlock the secrets of your birth date. Discover how numerology calculates your Life-Path number and what it reveals about your personality, strengths, and destiny.',
        author: authors.SOFIA_CHEN,
        publishDate: '2023-10-26',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" },
            React.createElement("p", null, "Numerology is an ancient belief system that posits a mystical relationship between numbers and coinciding events. It's the idea that the universe is a system and, once broken down, we are left with the basic elements, which are numbers. By understanding these numbers, we can gain deeper insights into ourselves and the world around us."),
            React.createElement("h3", { className: "text-blue-400" }, "The Core Concept: The Life-Path Number"),
            React.createElement("p", null, "At the heart of numerology is the Life-Path number. This number is derived from your date of birth and is said to represent who you are at your core\u2014your personality, the opportunities and challenges you will face, and the path you will walk in this life. It's considered the most important number in your numerology chart."),
            React.createElement("h3", { className: "text-blue-400" }, "How is it Calculated?"),
            React.createElement("p", null, "The calculation is a simple process of reduction. You take each component of your birth date (year, month, and day) and reduce them to a single digit or a \"Master Number\" (11, 22, or 33)."),
            React.createElement("p", null, "For example, let's take the birth date May 15, 1990 (05-15-1990)."),
            React.createElement("ol", null,
                React.createElement("li", null, React.createElement("strong", null, "Month:"), " May is the 5th month. So, Month = 5."),
                React.createElement("li", null, React.createElement("strong", null, "Day:"), " The day is 15. We reduce it: 1 + 5 = 6. So, Day = 6."),
                React.createElement("li", null, React.createElement("strong", null, "Year:"), " The year is 1990. We reduce it: 1 + 9 + 9 + 0 = 19. Since 19 is not a single digit, we reduce it further: 1 + 9 = 10, and again 1 + 0 = 1. So, Year = 1."),
                React.createElement("li", null, React.createElement("strong", null, "Final Sum:"), " Now, we add the reduced numbers: 5 (Month) + 6 (Day) + 1 (Year) = 12."),
                React.createElement("li", null, React.createElement("strong", null, "Final Reduction:"), " We reduce the final sum: 1 + 2 = 3.")
            ),
            React.createElement("p", null, "So, for a person born on May 15, 1990, the Life-Path number is 3. LifeArc's Chrono Insights tool does this for you instantly."),
            React.createElement("h3", { className: "text-blue-400" }, "What Does It Mean?"),
            React.createElement("p", null, "Each number from 1 to 9, plus the Master Numbers 11, 22, and 33, has its own distinct meaning and energy. A Life-Path 3, for instance, is often associated with creativity, communication, and social interaction. They are the \"Communicators.\" A Life-Path 8, the \"Powerhouse,\" is associated with ambition, leadership, and financial success."),
            React.createElement("p", null, "While numerology is not a hard science, many find it to be a valuable tool for self-reflection and personal growth. It provides a framework for understanding your innate tendencies and can help guide you toward a more fulfilling life path. Explore your number in our app and see what resonates with you!")
        ),
    },
    {
        slug: 'the-truth-about-biorhythms',
        title: 'The Truth About Biorhythms: Science, Pseudoscience, and Self-Awareness',
        summary: 'Are biorhythms real? We explore the history of the three primary cycles—physical, emotional, and intellectual—and discuss how you can use them as a tool for personal planning, regardless of their scientific standing.',
        author: authors.EVELYN_REED,
        publishDate: '2023-11-05',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" },
            React.createElement("p", null, "The theory of biorhythms suggests that our lives are influenced by rhythmic biological cycles that affect our physical, emotional, and intellectual capabilities. It's an idea that has fascinated people for over a century, promising a way to predict our \"on\" and \"off\" days. But what's the real story behind these oscillating waves?"),
            React.createElement("h3", { className: "text-blue-400" }, "The Three Core Cycles"),
            React.createElement("p", null, "Classic biorhythm theory, as seen in the LifeArc app, is based on three main cycles that begin at birth:"),
            React.createElement("ul", null,
                React.createElement("li", null, React.createElement("strong", null, "Physical Cycle (23 days):"), " This cycle is said to govern physical strength, stamina, coordination, and general well-being."),
                React.createElement("li", null, React.createElement("strong", null, "Emotional Cycle (28 days):"), " This cycle influences our emotions, mood, creativity, and intuition. Its 28-day period is often noted for its similarity to the lunar cycle."),
                React.createElement("li", null, React.createElement("strong", null, "Intellectual Cycle (33 days):"), " This cycle is believed to affect our cognitive functions, such as logical reasoning, memory, and learning ability.")
            ),
            React.createElement("p", null, "Each cycle follows a sine wave pattern, starting at a neutral point (zero) on the day of birth, rising to a positive peak, falling back through zero to a negative trough, and then returning to the baseline to begin again."),
            React.createElement("h3", { className: "text-blue-400" }, "Scientific Standing: A Clear Verdict"),
            React.createElement("p", null, "It's important to state clearly: from a scientific perspective, biorhythm theory is considered a pseudoscience. Numerous studies conducted over several decades have found no correlation between biorhythm charts and actual performance in sports, academics, or accident rates. The scientific community has largely dismissed the theory for its lack of empirical evidence and its arbitrary choice of cycle lengths."),
            React.createElement("h3", { className: "text-blue-400" }, "So, Why Use It? The Value of Rhythmic Thinking"),
            React.createElement("p", null, "If biorhythms aren't scientifically proven, why do they persist in tools like LifeArc? The value lies not in their predictive accuracy, but in their ability to promote self-reflection and structured planning."),
            React.createElement("p", null, "Thinking about your life in cycles can be a powerful psychological tool. It encourages you to:"),
            React.createElement("ul", null,
                React.createElement("li", null, React.createElement("strong", null, "Practice Self-Awareness:"), " Simply asking \"How do I feel physically today?\" can lead to better decisions, like choosing a lighter workout on a low-energy day."),
                React.createElement("li", null, React.createElement("strong", null, "Combat the \"Always On\" Mentality:"), " Biorhythms build in the idea of rest and recovery phases. Seeing a \"trough\" on your chart can be a welcome reminder that it's okay\u2014and even necessary\u2014to have less productive days."),
                React.createElement("li", null, React.createElement("strong", null, "Plan with Intention:"), " You might use a \"peak\" intellectual day to tackle a complex report, or a \"peak\" emotional day for important conversations. Whether the chart is the cause or not, this intentional planning can lead to better outcomes.")
            ),
            React.createElement("p", null, "Ultimately, think of your biorhythm chart not as a crystal ball, but as a unique kind of journal or planner. It's a fun, structured way to think about your personal energy and to schedule your life with more mindfulness. Use it as a guide for introspection, not as an infallible predictor of the future.")
        ),
    },
    {
        slug: 'charting-your-family-history',
        title: 'Charting Your Family History: More Than Just Names and Dates',
        summary: 'Building a family tree is a journey of discovery. Learn how visualizing your family\'s timeline can reveal fascinating patterns, from generational gaps to shared milestones, and strengthen your connection to your heritage.',
        author: authors.JAMES_CARTER,
        publishDate: '2023-11-12',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" },
            React.createElement("p", null, "Genealogy has seen a massive surge in popularity, with people eager to trace their roots and understand where they come from. But a family tree is more than just a list of ancestors. When you bring it to life with dates and relationships, as with the LifeArc Family Tracker, it becomes a dynamic map of your personal history, revealing stories and patterns you might never have noticed."),
            React.createElement("h3", { className: "text-blue-400" }, "The Power of Visualization"),
            React.createElement("p", null, "Seeing your family members' ages tick up in real-time, or visualizing the age gaps between siblings and cousins, transforms abstract data into something tangible and personal. It answers questions like:"),
            React.createElement("ul", null,
                React.createElement("li", null, "\"How old was my grandmother when my mother was born?\""),
                React.createElement("li", null, "\"Which generation does my family have the most members in?\""),
                React.createElement("li", null, "\"What's the average age of my relatives?\"")
            ),
            React.createElement("p", null, "These aren't just trivial facts; they are data points that tell the story of your family's growth, its structure, and its unique rhythm through time."),
            React.createElement("h3", { className: "text-blue-400" }, "Discovering Generational Patterns"),
            React.createElement("p", null, "One of the most fascinating aspects of tracking your family's timeline is seeing the generational clusters. By adding relatives and their birth dates, you can quickly see the distribution across generations like Baby Boomers, Gen X, Millennials, and Gen Z. This can highlight:"),
            React.createElement("ul", null,
                React.createElement("li", null, React.createElement("strong", null, "Historical Context:"), " Understanding that your grandparents were part of the \"Silent Generation\" gives context to their values and experiences, shaped by events like the Great Depression and World War II."),
                React.createElement("li", null, React.createElement("strong", null, "Family Dynamics:"), " A large gap between generational clusters might explain differences in communication styles or worldviews within the family."),
                React.createElement("li", null, React.createElement("strong", null, "Demographic Shifts:"), " You can see trends in your own family, such as the average age of parents at childbirth or the number of children per generation.")
            ),
            React.createElement("h3", { className: "text-blue-400" }, "Getting Started with Your Family Tree"),
            React.createElement("p", null, "The journey begins with what you know. Here are some simple steps to get started using the LifeArc Family Tracker:"),
            React.createElement("ol", null,
                React.createElement("li", null, React.createElement("strong", null, "Start with Yourself:"), " Add your own name and date of birth."),
                React.createElement("li", null, React.createElement("strong", null, "Add Immediate Family:"), " Add your parents, siblings, and children. You likely know their birth dates already."),
                React.createElement("li", null, React.createElement("strong", null, "Talk to Relatives:"), " Call your parents, grandparents, aunts, and uncles. They are the keepers of family history. Ask them for names, dates, and stories. This is often the most rewarding part of the process."),
                React.createElement("li", null, React.createElement("strong", null, "Use the \"Relation\" Field:"), " Be descriptive. Use standard terms like \"Parent\" or \"Sibling,\" but don't be afraid to use the \"Other\" category for \"Godparent,\" \"Mentor,\" or \"Lifelong Friend.\" A family is more than just blood.")
            ),
            React.createElement("p", null, "By charting your family's history, you are not just collecting data; you are preserving a legacy. You are creating a living document that honors the past and provides a valuable perspective for future generations.")
        ),
    },
    {
        slug: 'psychology-of-time-perception',
        title: 'The Psychology of Time: Why It Speeds Up as We Age',
        author: authors.EVELYN_REED,
        publishDate: '2023-11-20',
        summary: 'Ever feel like the years are flying by faster than they used to? You\'re not alone. We explore the cognitive reasons behind this common phenomenon and how novelty impacts our perception of time.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" },
            React.createElement("p", null, "It's a common refrain among adults: \"The days are long, but the years are short.\" This feeling that time accelerates as we get older is a well-documented psychological phenomenon. But why does it happen? The answer lies in how our brains process and store new information."),
            React.createElement("h3", { className: "text-blue-400" }, "The 'Holiday Paradox'"),
            React.createElement("p", null, "Think about a week-long vacation versus a typical week at work. The vacation seems to fly by while you're on it, but looking back, it feels rich and long. The work week, however, might drag on but is a blur in retrospect. This is because our brains gauge the 'length' of a past period based on the number of new memories we formed."),
            React.createElement("p", null, "When we are young, almost everything is a new experience. The first day of school, learning to ride a bike, a first kiss—these are all novel, memory-dense events. Our brains are working overtime to encode these new experiences. As we age, life becomes more routine. Weeks, months, and even years can blend together because they lack distinct, new memories."),
            React.createElement("h3", { className: "text-blue-400" }, "The Proportional Theory"),
            React.createElement("p", null, "Another compelling theory is that we perceive time relative to the total amount of time we've lived. For a 5-year-old, one year is 20% of their entire life—a massive chunk of time. For a 50-year-old, one year is just 2% of their life. This ever-decreasing proportional significance makes each subsequent year feel shorter than the last."),
            React.createElement("h3", { className: "text-blue-400" }, "How to 'Slow Down' Time"),
            React.createElement("p", null, "If routine is the enemy of memorable time, then the antidote is novelty. To make time feel more expansive, you can consciously introduce new experiences into your life:"),
            React.createElement("ul", null,
                React.createElement("li", null, React.createElement("strong", null, "Break Your Routines:"), " Take a different route to work, try a new recipe, or visit a new park."),
                React.createElement("li", null, React.createElement("strong", null, "Learn a New Skill:"), " Learning a new language, instrument, or hobby forces your brain to create new neural pathways and dense memories."),
                React.createElement("li", null, React.createElement("strong", null, "Travel:"), " Even a short trip to a nearby town can provide a wealth of new stimuli for your brain to process."),
                React.createElement("li", null, React.createElement("strong", null, "Be Present:"), " Practicing mindfulness can help you pay more attention to the present moment, making everyday experiences richer and more memorable.")
            ),
            React.createElement("p", null, "While we can't literally stop the clock, we can influence our perception of its passage. By filling our lives with learning and new experiences, we can make the years feel just as long and full as they did when we were young.")
        )
    },
    {
        slug: 'what-are-master-numbers',
        title: 'What Are Master Numbers in Numerology? (11, 22, 33)',
        author: authors.SOFIA_CHEN,
        publishDate: '2023-11-28',
        summary: 'In numerology, some numbers carry a special weight. We explore the meaning of the Master Numbers 11, 22, and 33, and the unique potential and challenges they represent for those who have them.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" },
            React.createElement("p", null, "In the practice of numerology, while most numbers are reduced to a single digit (1-9), there are three exceptions: 11, 22, and 33. These are known as the \"Master Numbers.\" They are believed to carry a greater intensity and potential for both achievement and challenge."),
            React.createElement("h3", { className: "text-blue-400" }, "The Master Number 11: The Visionary"),
            React.createElement("p", null, "The number 11 is the most intuitive of all numbers. It represents illumination, inspiration, and a connection to the subconscious. Those with a Life-Path 11 are often highly sensitive, empathetic, and possess a deep understanding of others. The challenge for an 11 is to ground their powerful visions in reality without being overwhelmed by anxiety or fear. It combines the leadership of the number 1 twice over, but also has the peacemaking qualities of its reduced form, 2 (1+1=2)."),
            React.createElement("h3", { className: "text-blue-400" }, "The Master Number 22: The Master Builder"),
            React.createElement("p", null, "The number 22 is considered the most powerful number in numerology. It has the ability to turn grand dreams into tangible reality. It combines the intuition of the 11 with the practical, grounded nature of the 4 (2+2=4). A Life-Path 22 individual has the potential for immense success and achievement, but they must learn to handle pressure and responsibility. Their challenge is to use their power for the greater good, not just for personal gain."),
            React.createElement("h3", { className: "text-blue-400" }, "The Master Number 33: The Master Teacher"),
            React.createElement("p", null, "The number 33 is the rarest of the Master Numbers. It represents unconditional love, healing, and spiritual service. A Life-Path 33 is focused on uplifting and inspiring humanity. This number combines the creative expression of the 3 with the nurturing and responsible energy of the 6 (3+3=6). The 33 is not about personal ambition but about selfless service. The challenge is to maintain personal boundaries and avoid becoming a martyr while helping others."),
            React.createElement("h3", { className: "text-blue-400" }, "A Double-Edged Sword"),
            React.createElement("p", null, "Having a Master Number in your chart is not necessarily 'better' than having a single-digit number. It simply indicates a higher potential for both success and difficulty. It's a 'master' number because it requires mastery of oneself. Many people with Master Numbers in their chart live out the energy of the reduced, single-digit number (2, 4, or 6) for much of their lives, only stepping into the full potential of the Master Number later in life once they've gained enough experience.")
        )
    },
    {
        slug: 'julian-day-for-precision-timekeeping',
        title: 'The Julian Day: A Secret Weapon for Precision Timekeeping',
        author: authors.EVELYN_REED,
        publishDate: '2023-12-04',
        summary: 'LifeArc uses Julian Day Numbers for its core calculations. Learn what this system is, why it was invented by astronomers, and how it eliminates common time-tracking errors from timezones and daylight saving.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" },
            React.createElement("p", null, "When calculating the exact duration between two dates, programmers and scientists face a surprising number of challenges: leap years, different month lengths, timezones, and daylight saving time shifts. To overcome this, astronomers in the 16th century developed a beautifully simple system: the Julian Day Number (JDN)."),
            React.createElement("h3", { className: "text-blue-400" }, "What is a Julian Day Number?"),
            React.createElement("p", null, "The Julian Day system is a continuous count of days that have passed since a specific starting point. That starting point, known as the Julian epoch, is noon Universal Time on January 1, 4713 BC. Every subsequent day is assigned a consecutive integer."),
            React.createElement("p", null, "For example, the Julian Day Number for January 1, 2000, at noon UT was 2,451,545. This system allows for the time difference between any two dates to be calculated with a simple subtraction, completely ignoring the complexities of the Gregorian calendar."),
            React.createElement("h3", { className: "text-blue-400" }, "Why It's a Game-Changer for Accuracy"),
            React.createElement("p", null, "At LifeArc, we use the JDN for our core time calculations. Here's why that matters:"),
            React.createElement("ul", null,
                React.createElement("li", null, React.createElement("strong", null, "No More Timezone Headaches:"), " The JDN is based on a single, global standard (Universal Time), so it doesn't matter if you were born in New York or Tokyo. The calculation is consistent."),
                React.createElement("li", null, React.createElement("strong", null, "Daylight Saving Time Becomes Irrelevant:"), " Since the JDN is a simple count of 24-hour periods, the one-hour shifts of DST don't affect the total number of days counted."),
                React.createElement("li", null, React.createElement("strong", null, "Simplifies Leap Years:"), " The continuous count automatically accounts for the extra day in a leap year without any special conditional logic.")
            ),
            React.createElement("p", null, "By converting your birth date and the current date into Julian Day Numbers, we can find the precise difference and then translate that back into the familiar format of years, months, days, hours, minutes, and seconds. It's an extra step behind the scenes that ensures the numbers you see on your screen are as accurate as possible.")
        )
    },
    {
        slug: 'beginners-guide-to-genealogy',
        title: 'Unlocking Your Past: A Beginner\'s Guide to Genealogy',
        author: authors.JAMES_CARTER,
        publishDate: '2023-12-11',
        summary: 'Want to build your family tree but don\'t know where to start? This guide provides practical steps for gathering information, organizing your findings, and using tools like LifeArc to bring your family history to life.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" },
            React.createElement("p", null, "Genealogy, the study of family history, is a rewarding hobby that connects you to your past in a profound way. It can seem daunting at first, but with a structured approach, anyone can become a family historian. Here's a guide to get you started."),
            React.createElement("h3", { className: "text-blue-400" }, "Step 1: Start with What You Know"),
            React.createElement("p", null, "The golden rule of genealogy is to start with yourself and work backward. You are the 'root' of your research. Gather your own vital records (birth certificate, marriage license) and then move to your parents, grandparents, and so on. Use a tool like the LifeArc Family Tracker to input this initial information. This creates a foundation for your tree."),
            React.createElement("h3", { className: "text-blue-400" }, "Step 2: Interview Your Relatives"),
            React.createElement("p", null, "Your older relatives are living libraries of family history. Schedule time to talk to them, and be prepared with specific questions. Ask about names, dates, and places, but also ask for stories. What was life like? Who were their parents? What family traditions do they remember? These interviews can provide invaluable clues and personal details that you won't find in any record."),
            React.createElement("h3", { className: "text-blue-400" }, "Step 3: Organize Your Findings"),
            React.createElement("p", null, "As you gather information, it's crucial to keep it organized. Digital tools are excellent for this. When you add a member to the LifeArc Family Tracker, you're creating a digital record that includes their name, relationship to you, and date of birth. This prevents confusion and helps you see the emerging patterns in your family's timeline."),
            React.createElement("h3", { className: "text-blue-400" }, "Step 4: Seek Out Records"),
            React.createElement("p", null, "Once you've exhausted your family's knowledge, it's time to dig into historical records. Many of these are now available online through websites like Ancestry, FamilySearch, and national archives. Key records to look for include:"),
            React.createElement("ul", null,
                React.createElement("li", null, "Census Records"),
                React.createElement("li", null, "Birth, Marriage, and Death Certificates"),
                React.createElement("li", null, "Military Records"),
                React.createElement("li", null, "Immigration and Naturalization Papers")
            ),
            React.createElement("p", null, "Genealogy is a marathon, not a sprint. Be patient, verify your sources, and enjoy the process of discovery. Each new piece of information is a part of the puzzle that is your personal history.")
        )
    },
    {
        slug: 'cultural-milestone-birthdays',
        title: 'Milestone Birthdays: The Cultural Significance of Turning 18, 21, and 50',
        author: authors.JAMES_CARTER,
        publishDate: '2023-12-18',
        summary: 'Why do we celebrate certain birthdays more than others? Explore the historical and cultural reasons behind major milestone birthdays and what they represent in our life journey.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'circadian-rhythms-vs-biorhythms',
        title: 'Beyond the Clock: Circadian Rhythms vs. Biorhythms',
        author: authors.EVELYN_REED,
        publishDate: '2024-01-02',
        summary: 'One is a proven science, the other a fascinating theory. We break down the differences between our internal body clock (circadian rhythm) and the cycles of Biorhythm theory.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'creating-digital-family-archive',
        title: 'Creating a Digital Family Archive: Preserving Your Legacy',
        author: authors.JAMES_CARTER,
        publishDate: '2024-01-09',
        summary: 'Go beyond the family tree. Learn how to digitize old photos, record oral histories, and use cloud storage to create a secure and accessible archive of your family\'s story for future generations.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'saturn-return-astrology',
        title: 'The "Saturn Return": An Astrological Milestone and Its Meaning',
        author: authors.SOFIA_CHEN,
        publishDate: '2024-01-16',
        summary: 'Around ages 29, 58, and 87, the planet Saturn returns to the place it was at your birth. Discover what this major astrological transit signifies and how it marks a period of maturation and responsibility.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'time-capsules-past-future',
        title: 'Time Capsules: A Tangible Link to Your Past and Future',
        author: authors.JAMES_CARTER,
        publishDate: '2024-01-23',
        summary: 'A time capsule is more than a box of old stuff; it\'s a message to the future. We provide a guide on what to include, how to preserve it, and the importance of creating these personal historical records.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'trust-your-intuition-cycle',
        title: 'Can You Trust Your Intuition? A Look at the "Intuition Cycle"',
        author: authors.SOFIA_CHEN,
        publishDate: '2024-01-30',
        summary: 'Our Intuition Cycle tool charts days of high insight. We explore the psychology of gut feelings and how you can harness moments of heightened intuition for creativity and decision-making.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'generational-divides-technology',
        title: 'Generational Divides: How Technology Shapes Our View of Time',
        author: authors.EVELYN_REED,
        publishDate: '2024-02-06',
        summary: 'From Boomers who remember life before the internet to Gen Alpha natives, each generation has a unique relationship with technology that shapes their perception of time, communication, and family.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'korean-age-explained',
        title: 'The Concept of "K-Age" (Korean Age) Explained',
        author: authors.SOFIA_CHEN,
        publishDate: '2024-02-13',
        summary: 'In East Asia, you might be a year or two older. We explain the traditional age-reckoning system where a baby is one year old at birth and everyone gets older on New Year\'s Day.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'life-path-for-career-guidance',
        title: 'How to Use Your Life-Path Number for Career Guidance',
        author: authors.SOFIA_CHEN,
        publishDate: '2024-02-20',
        summary: 'Your numerology can offer clues about the careers you might find most fulfilling. We match each Life-Path number to potential professions that align with its core strengths.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'history-of-the-calendar',
        title: 'A Brief History of the Calendar: From Caesar to Gregory',
        author: authors.JAMES_CARTER,
        publishDate: '2024-02-27',
        summary: 'Why do we have leap years? Why does October have "octo" but is the tenth month? Discover the fascinating history of the Julian and Gregorian calendars and how we standardized time.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'memory-and-time',
        title: 'Memory and Time: How Our Brains Construct a Personal Timeline',
        author: authors.EVELYN_REED,
        publishDate: '2024-03-05',
        summary: 'Our memory isn\'t a perfect recording. It\'s a reconstruction. Learn about "flashbulb memories," how emotion affects our recall of events, and why our personal history is a living story.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'philosophy-of-time',
        title: 'The Philosophy of Time: Are the Past, Present, and Future Real?',
        author: authors.EVELYN_REED,
        publishDate: '2024-03-12',
        summary: 'Is time a fundamental aspect of the universe, or a construct of human consciousness? We touch on the philosophical debates between presentism, eternalism, and the growing block universe theory.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'rituals-and-milestones',
        title: 'The Role of Rituals in Marking Time and Family Milestones',
        author: authors.JAMES_CARTER,
        publishDate: '2024-03-19',
        summary: 'From birthday cakes to graduation ceremonies, rituals give structure and meaning to the passage of time. Explore the social and psychological importance of these shared traditions.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
    {
        slug: 'genealogy-roadblocks',
        title: 'Finding Your Roots: Tips for Overcoming Genealogy Roadblocks',
        author: authors.JAMES_CARTER,
        publishDate: '2024-03-26',
        summary: 'Hit a dead end in your family tree research? We provide expert tips for tackling common challenges like misspelled names, missing records, and tracing female ancestral lines.',
        content: React.createElement("div", { className: "prose prose-invert max-w-none text-gray-300" } /* ... */)
    },
];