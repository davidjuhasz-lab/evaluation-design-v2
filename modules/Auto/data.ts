
// Mock Data for Docu Pipeline
export const docuPipelineFiles = [
    { name: "Employment_Contract_J_Doe_2024.pdf", size: "2.4 MB", type: "application/pdf" },
    { name: "Invoice_INV-2023-001_AcmeCorp.pdf", size: "145 KB", type: "application/pdf" },
    { name: "ID_Card_Scan_Front_DriverLic.jpg", size: "3.2 MB", type: "image/jpeg" },
    { name: "NDA_Confidential_Project_X.docx", size: "540 KB", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    { name: "Receipt_Coffee_Meeting_02_14.png", size: "1.1 MB", type: "image/png" }
];

export const simulatedConversations = [
    {
        id: "sim-001",
        persona: "Frustrated User",
        topic: "Refund Policy",
        turns: 4,
        preview: "I need a refund immediately for this...",
        messages: [
            { role: "user", content: "I need a refund immediately for this subscription. It's not working as advertised." },
            { role: "assistant", content: "I'm sorry to hear you're having trouble. Could you please provide your order number so I can look into this?" },
            { role: "user", content: "I don't have it right now. Can't you look it up by email? It's john@example.com." },
            { role: "assistant", content: "Thanks, John. I've found your account. Since it's been less than 30 days, I can process that refund for you now." }
        ]
    },
    {
        id: "sim-002",
        persona: "Technical Explorer",
        topic: "API Rate Limits",
        turns: 6,
        preview: "What are the specific headers for...",
        messages: [
            { role: "user", content: "What are the specific headers returned when I hit the API rate limit?" },
            { role: "assistant", content: "When you exceed the rate limit, the API returns a 429 status code along with `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers." },
            { role: "user", content: "Is the reset time in epoch seconds or ISO format?" },
            { role: "assistant", content: "The `X-RateLimit-Reset` header provides the time in UTC epoch seconds." }
        ]
    },
    {
        id: "sim-003",
        persona: "Senior Executive",
        topic: "Q3 Summary",
        turns: 2,
        preview: "Give me the bullet points for Q3...",
        messages: [
            { role: "user", content: "Give me the bullet points for Q3 revenue. Keep it brief." },
            { role: "assistant", content: "Here is the Q3 Revenue summary:\n- Total Revenue: $4.2M (+12% YoY)\n- Net Profit: $1.1M\n- Key Driver: Enterprise adoption increased by 20%." }
        ]
    },
    {
        id: "sim-004",
        persona: "Novice User",
        topic: "Account Setup",
        turns: 8,
        preview: "I'm trying to change my password but...",
        messages: [
            { role: "user", content: "I'm trying to change my password but I can't find the settings page." },
            { role: "assistant", content: "No problem! You can find the settings by clicking on your profile avatar in the top right corner, then selecting 'Settings' from the dropdown." },
            { role: "user", content: "Okay, I see it. Now where is the password option?" },
            { role: "assistant", content: "Inside Settings, click on the 'Security' tab on the left sidebar. You'll see the 'Change Password' form there." }
        ]
    }
];

export const docuPipelineResults = [
    {
        id: 1,
        title: "Employment_Contract_J_Doe_2024.pdf",
        status: "pass",
        fileType: "PDF",
        fileSize: "2.4 MB",
        metrics: [
            { name: "OCR Quality", value: 9.8 },
            { name: "Entity Extraction", value: 9.5 },
            { name: "Classification", value: 9.9 }
        ],
        extractedData: {
            "document_type": "contract",
            "parties": ["John Doe", "Tech Global Inc"],
            "start_date": "2024-03-01",
            "salary": "$120,000"
        }
    },
    {
        id: 2,
        title: "ID_Card_Scan_Front_DriverLic.jpg",
        status: "fail", // Flagged because OCR < 7
        fileType: "JPG",
        fileSize: "3.2 MB",
        metrics: [
            { name: "OCR Quality", value: 4.5 }, // Low confidence
            { name: "Entity Extraction", value: 6.2 }, // Low confidence
            { name: "Classification", value: 8.0 }
        ],
        extractedData: {
            "document_type": "id_card",
            "id_number": "D123**** (illegible)",
            "name": "Jane Sm*th",
            "expiry": null
        }
    },
    {
        id: 3,
        title: "Invoice_INV-2023-001_AcmeCorp.pdf",
        status: "pass",
        fileType: "PDF",
        fileSize: "145 KB",
        metrics: [
            { name: "OCR Quality", value: 9.9 },
            { name: "Entity Extraction", value: 8.8 },
            { name: "Classification", value: 9.2 }
        ],
        extractedData: {
            "document_type": "invoice",
            "invoice_number": "INV-2023-001",
            "total_amount": "$4,500.00",
            "vendor": "Acme Corp"
        }
    },
    {
        id: 4,
        title: "Receipt_Coffee_Meeting_02_14.png",
        status: "fail", // Flagged
        fileType: "PNG",
        fileSize: "1.1 MB",
        metrics: [
            { name: "OCR Quality", value: 6.8 }, // Low confidence
            { name: "Entity Extraction", value: 7.2 },
            { name: "Classification", value: 8.5 }
        ],
        extractedData: {
            "document_type": "receipt",
            "merchant": "Starb**ks",
            "date": "2024-02-14",
            "total": "$12.50"
        }
    }
];
