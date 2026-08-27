/* -- TYPING ANIMATION -- */
// Text that will appear after "Hi, I'm".
const messages = [
    " Richard Wang",
    " an aspiring engineer",
    " a reader",
    " a weightlifter",
    " a music fan"
];

const typingText = document.getElementById("typing-text");

let messageIndex = 0;
let characterIndex = 0;
let isDeleting = false;


// Type and delete each message 
function typeMessage() {
    const currentMessage = messages[messageIndex];

    // Add/remove char
    if (isDeleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    // Display the current portion of message
    typingText.textContent = currentMessage.substring(0, characterIndex);

    // Once the message is fully typed, pause before deleting 
    if (!isDeleting && characterIndex === currentMessage.length) {
        setTimeout(() => {
            isDeleting = true;
            typeMessage();
        }, 1800);

        return;
    }
    
    // Once the message is fully deleted, move to next message
    if (isDeleting && characterIndex === 0) {

        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
    }

    // Typing is slower than deleting.
    const speed = isDeleting ? 45 : 75;

    setTimeout(typeMessage, speed);
}

// Start animation
typeMessage();

/* -- PROJECT DATA (creates project cards) -- */
const projects = [

    {
        name: "BopIt Mini! Embedded System",
        date: "May 2026",
        role: "Collaborator \u2014 Cornell University",

        bullets: [
            "Programmed BopIt on the FRDM-KL46Z using a real-time scheduler, LEDs, accelerometer, display,                            buttons, and a touch capacitor",
            "Randomly generates tasks with shrinking deadlines, speeding up over the course of the game"
        ],
        tags: [
            "C",
            "FRDM-KL46Z",
            "RTOS",
            "MCUXpresso"
        ],
        links: [
            {
                label: "Webpage",
                url: "https://pages.github.coecis.cornell.edu/ece3140-spr2026/ah2365-rzw2/"
            }
        ]
    },


    {
        name: "Door Monitor \u2014 TinyRV1 Embedded System",
        date: "Nov 2025",
        role: "Collaborator \u2014 Cornell University",

        bullets: [
            "Implemented, tested, and programmed a single-cycle, general-purpose processor onto an FPGA supporting addi,              add, mul, lw, sw, jr, jal, and bne (a subset of RISC-V)",
            "Built processor components including SPI, an immediate generation unit, memory bus, shift register, and                  synchronizer",
            "Sensor buzzes on detection and increments a counter once the sensor goes low after the first detection"
        ],
        tags: [
            "Verilog",
            "RISC-V",
            "FPGA"
        ],
        links: [
            {
                label: "Demo",
                url: "https://drive.google.com/file/d/12L16MlD3iLHJumNOEc8nNQfB7in39jw_/view?usp=drivesdk"
            }
        ]
    },


    {
        name: "Music Player",
        date: "Oct 2025",
        role: "Collaborator \u2014 Cornell University",

        bullets: [
            "Select songs via switches and a start signal via button, with an LED indicating the player is ready",
            "Generates square waves at specific frequencies to play songs through a piezo buzzer"
        ],
        tags: [
            "Verilog",
            "FPGA",
            "Digital Logic"
        ],
        links: [
            {
                label: "Demo",
                url: "https://drive.google.com/file/d/125EID5ec3V33Nv_IytCAdLs4B8aRl8dL/view?usp=sharing"
            }
        ]
    },


    {
        name: "The Wildfire Project",
        date: "Aug 2023",
        role: "Collaborator \u2014 All Star Code",

        bullets: [
            "Designed and presented a website to track wildfires, spread awareness, and refer others to helpful                       resources",
            "Developed the front-end composition and color scheme, gathered source information, and created the                       presentation"
        ],
        tags: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        links: [
            {
                label: "Link",
                url: "https://replit.com/@richardw83457/TheWildfireProject?v=1"
            }
        ]
    }

];

/* -- PROJECT RENDERING-- */

// Creates all project cards and places them inside the #project-grid element.
function renderProjects() {

    const grid = document.getElementById("project-grid");

    grid.innerHTML = projects
        // create  HTML card for each project
        .map((project, index) => {

            // Create reference numbers 
            const referenceId = `U${index + 1}`;

            // Convert project tags into chips
            const tags = project.tags
                .map(tag => `
                    <span class="chip-sm">
                        ${tag}
                    </span>
                `)
                // combines all cards into one string
                .join("");

            // Convert bullet points into <li> 
            const bullets = project.bullets
                .map(bullet => `
                    <li>
                        ${bullet}
                    </li>
                `)
                .join("");

            // Convert project links into <a>
            const links = project.links
                .map(link => {

                    // Make proj URL clickable
                    if (link.url) {
                        return `
                            <a
                                href="${link.url}"
                                target="_blank"
                                rel="noopener"
                            >
                                ${link.label} &rarr;
                            </a>
                        `;
                    }
                    // Display label otherwise
                    return `
                        <span class="no-link">
                            ${link.label}
                        </span>
                    `;
                })
                .join("");

            // Return card
            return `
                <article class="card">

                    <span class="refid">
                        ${referenceId}
                    </span>
                    <h3>
                        ${project.name}
                    </h3>
                    <div class="cdate">
                        ${project.date}
                        ${project.role ? ` &middot; ${project.role}` : ""}
                    </div>
                    <ul>
                        ${bullets}
                    </ul>
                    <div class="tags">
                        ${tags}
                    </div>
                    <div class="links">
                        ${links}
                    </div>
                </article>
            `;
        })
        .join("");
}


/* -- LINKEDIN -- */
const LINKEDIN_URL = "https://www.linkedin.com/in/richardzwang/";

// add URL to both buttons
function setupLinkedIn() {

    const linkedinButtons = [
        document.getElementById("linkedin-pin"),
        document.getElementById("linkedin-pin-2")
    ];

    linkedinButtons.forEach(button => {
        if (button) {
            button.href = LINKEDIN_URL;
        }
    });
}

renderProjects();
setupLinkedIn();