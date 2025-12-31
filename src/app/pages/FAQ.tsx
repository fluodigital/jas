import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What materials are used for the canvas prints?',
    answer: 'Our prints are created on premium museum-grade canvas using archival-quality pigment inks. This combination ensures vibrant colors that resist fading for decades.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard UK delivery takes 5-7 business days and is free on orders over £100. Express delivery (2-3 business days) is available for £9.99. International shipping times vary by location.',
  },
  {
    question: 'Can I return or exchange my print?',
    answer: 'Yes! We offer a 30-day return policy. If you\'re not completely satisfied, you can return your print for a full refund or exchange. The print must be in its original condition.',
  },
  {
    question: 'Do you offer custom sizes?',
    answer: 'Currently, we offer four standard sizes (8×10", 12×16", 16×20", and 24×36"). For custom size requests, please contact us directly and we\'ll do our best to accommodate.',
  },
  {
    question: 'Are the prints signed?',
    answer: 'You can choose to have your print signed by Jas during checkout for an additional £15. The signature is applied to the back of the canvas.',
  },
  {
    question: 'What frame options are available?',
    answer: 'You can choose from no frame, black frame, or white frame. Our frames are made from high-quality wood and complement the canvas beautifully.',
  },
  {
    question: 'How should I care for my canvas print?',
    answer: 'Keep your print away from direct sunlight and moisture. Dust gently with a soft, dry cloth. Avoid touching the canvas surface directly.',
  },
  {
    question: 'Do you offer gift wrapping?',
    answer: 'Yes! Gift wrapping is available for £5 during checkout. Your print will arrive beautifully packaged and ready to give.',
  },
  {
    question: 'Is international shipping available?',
    answer: 'Yes, we ship worldwide. Shipping costs and delivery times vary by destination. These will be calculated at checkout.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also view your order status in your account dashboard.',
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl mb-4 text-white uppercase tracking-wider">Frequently Asked Questions</h1>
          <p className="text-white/60">
            Find answers to common questions about our prints and services
          </p>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="border border-white/10 overflow-hidden bg-black"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors group">
                  <span className="pr-4 text-white">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className="text-white/60 transition-transform group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-6 pb-6 text-white/70">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <div className="mt-12 text-center p-8 bg-black border border-white/10">
          <h2 className="text-xl mb-2 text-white uppercase tracking-wider">Still have questions?</h2>
          <p className="text-white/60 mb-6">We're here to help</p>
          <a
            href="/contact"
            className="inline-flex px-8 py-3 bg-[#EEFF00] text-black uppercase tracking-wider text-sm hover:bg-[#EEFF00]/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}