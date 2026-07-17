"use client";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const faqs = [
    {
        question: "Are these game CDs brand new or pre-owned?",
        answer: "We offer both! Each product page clearly mentions the condition. All pre-owned discs are chemically cleaned and 100% verified to work perfectly on your console or PC."
    },
    {
        question: "How long does shipping take within the country?",
        answer: "Standard shipping takes 2-3 business days. Next-day delivery is available for major tech cities if ordered before 4 PM."
    },
    {
        question: "Do PC premium CDs include digital activation keys?",
        answer: "Yes, all our physical PC premium titles come with an authentic activation key printed inside the box case for Steam, Epic, or EA App."
    },
    {
        question: "What is your return policy if a disc doesn't load?",
        answer: "We offer a 7-day replacement warranty. If a disc fails our verification test or arrives damaged, we will replace it or issue a full refund instantly."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-obsidian py-16 px-4 border-t border-gray-950">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-extrabold text-center text-ivory tracking-tight mb-2">
                    FREQUENTLY ASKED <span className="text-cyan">QUESTIONS</span>
                </h2>
                <p className="text-center text-fog text-sm mb-10">Everything you need to know about our gaming vault.</p>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-carbon border border-gray-800 rounded-xl overflow-hidden transition-all">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left font-semibold text-ivory hover:text-cyan transition-colors"
                            >
                                <span>{faq.question}</span>
                                <HiChevronDown className={`text-xl text-gray-500 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-cyan" : ""}`} />
                            </button>

                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "max-h-40 border-t border-gray-900" : "max-h-0"}`}>
                                <p className="p-5 text-fog text-sm leading-relaxed bg-obsidian/30">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}