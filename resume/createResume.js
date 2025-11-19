const docx = require("docx");
const fs = require("fs");

const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    BorderStyle,
    AlignmentType,
    UnderlineType,
} = docx;

// --- Constants for Styling ---
const ACCENT_COLOR = "2E74B5"; // A shade of blue similar to the template
const FONT_FAMILY = "Calibri";

// --- Helper function to create the main section headings (e.g., "SUMMARY") ---
const createSectionHeading = (text) => {
    return new Paragraph({
        children: [
            new TextRun({
                text: text.toUpperCase(),
                bold: true,
                color: ACCENT_COLOR,
                font: FONT_FAMILY,
                size: 24, // 12pt
            }),
        ],
        spacing: { before: 300, after: 100 },
        border: { bottom: { color: ACCENT_COLOR, size: 6, space: 1, value: "single" } },
    });
};

// --- Helper function for job/project titles ---
const createInstitution = (text) => {
    return new Paragraph({
        children: [
            new TextRun({
                text: text,
                bold: true,
                font: FONT_FAMILY,
                size: 22, // 11pt
            }),
        ],
    });
};

// --- Helper function for dates/locations ---
const createDate = (text) => {
    return new Paragraph({
        children: [
            new TextRun({
                text: text,
                italics: true,
                font: FONT_FAMILY,
                size: 20, // 10pt
            }),
        ],
        spacing: { after: 80 },
    });
};

// --- Helper function for bullet points ---
const createBullet = (text) => {
    return new Paragraph({
        text: text,
        bullet: { level: 0 },
        style: "default",
        alignment: AlignmentType.LEFT,
        indent: { left: 400 },
    });
};

// --- Helper function for skills and achievements in the right column ---
const createRightColumnEntry = (title, text) => {
    return [
        new Paragraph({
            children: [
                new TextRun({
                    text: title.toUpperCase(),
                    bold: true,
                    color: ACCENT_COLOR,
                    font: FONT_FAMILY,
                    size: 20, // 10pt
                }),
            ],
            spacing: { before: 200, after: 50 },
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: text,
                    font: FONT_FAMILY,
                    size: 20, // 10pt
                }),
            ],
        }),
    ];
};

// --- Main Document Creation ---
async function generateStyledResume() {
    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: { font: FONT_FAMILY, size: 20 }, // Default 10pt
                },
            },
        },
        sections: [{
            children: [
                // === HEADER: NAME & TITLE ===
                new Paragraph({
                    children: [new TextRun({ text: "VASUDEV VERMA", bold: true, size: 48 })],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Aspiring Associate Software Engineer | AI/ML Enthusiast | Full-Stack Developer",
                            color: ACCENT_COLOR,
                            bold: true,
                            size: 24,
                        }),
                    ],
                }),

                // === HEADER: CONTACT INFO TABLE ===
                new Table({
                    columnWidths: [4500, 4500],
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph("📧 vasudevverma0786@gmail.com")],
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: "🔗 linkedin.com/in/vasu-developer", alignment: AlignmentType.RIGHT })],
                                }),
                            ],
                        }),
                    ],
                }),
                new Paragraph(" "), // Spacer

                // === MAIN TWO-COLUMN LAYOUT TABLE ===
                new Table({
                    columnWidths: [6000, 3500],
                    borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } },
                    rows: [
                        new TableRow({
                            children: [
                                // --- LEFT COLUMN ---
                                new TableCell({
                                    children: [
                                        createSectionHeading("Summary"),
                                        new Paragraph("Aspiring Associate Software Engineer with strong foundations in Python, Java, and Data Structures & Algorithms. Currently expanding expertise in AI/ML/DL with hands-on projects using TensorFlow, PyTorch, and Scikit-learn. Passionate problem solver with proven experience in building scalable web applications and applying AI techniques to real-world datasets."),

                                        createSectionHeading("Projects"),
                                        createInstitution("Desi-Krishak – Full-Stack Web Application"),
                                        createDate("2025"),
                                        createBullet("Developed a full-stack agri-marketplace enabling users to buy and sell farm products, cattle, and tractors online."),
                                        createBullet("Built using React.js frontend and Node.js/Express, MongoDB."),
                                        
                                        createInstitution("Spam Email Classifier (NLP)"),
                                        createDate("2025"),
                                        createBullet("Built an ML model using Python & Scikit-learn to classify emails, achieving 95%+ accuracy."),

                                        createInstitution("Handwritten Digit Recognition (CNN)"),
                                        createDate("2025"),
                                        createBullet("Implemented a CNN model in TensorFlow/Keras to classify MNIST digits with 90% test accuracy."),

                                        createSectionHeading("Education"),
                                        createInstitution("Bachelor of Technology – Computer Science (Data Science)"),
                                        createDate("2022 – 2026 | ABES Institute of Technology, Ghaziabad"),
                                    ],
                                }),
                                
                                // --- RIGHT COLUMN ---
                                new TableCell({
                                    children: [
                                        createSectionHeading("Key Achievements"),
                                        ...createRightColumnEntry("Optimized Classification Model", "Built an NLP model for spam email classification with 95%+ accuracy using Python and Scikit-learn."),
                                        ...createRightColumnEntry("High-Accuracy Deep Learning", "Achieved 90% test accuracy on a CNN model for handwritten digit recognition using TensorFlow/Keras."),
                                        ...createRightColumnEntry("Full-Stack Application Development", "Designed and deployed a complete MERN stack agri-marketplace, enabling online transactions for farm goods."),

                                        createSectionHeading("Skills"),
                                        new Paragraph("Python, Java, JavaScript, C"),
                                        new Paragraph("Scikit-learn, Pandas, TensorFlow, PyTorch"),
                                        new Paragraph("React.js, Node.js, Express.js, MongoDB"),
                                        new Paragraph("Data Structures & Algorithms, OOP"),
                                        new Paragraph("Git, GitHub, MySQL, Docker"),

                                        createSectionHeading("Certifications"),
                                        new Paragraph("Introduction to Data Science and AI"),
                                        new Paragraph("Python for Data Science"),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }, ],
    });

    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("Vasudev_Verma_Resume_Styled.docx", buffer);
        console.log("✅ Successfully created Vasudev_Verma_Resume_Styled.docx");
    });
}

generateStyledResume();