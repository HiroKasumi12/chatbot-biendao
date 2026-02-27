export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { message } = req.body;

    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: "Bạn là chuyên gia về chủ quyền biển đảo Việt Nam. Trả lời ngắn gọn, rõ ràng. Câu hỏi: " + message
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi.";

        res.status(200).json({ reply });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}
