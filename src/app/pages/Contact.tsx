import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = (_data: ContactForm) => {
    toast.success('Message sent! We\'ll get back to you soon.');
    reset();
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-white text-4xl lg:text-5xl mb-4 uppercase tracking-wider">Get in Touch</h1>
          <p className="text-white/60">
            Have a question or want to discuss a custom order? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Mail size={20} className="text-[#EEFF00]" />
                <h3 className="text-white uppercase tracking-wider">Email</h3>
              </div>
              <p className="text-sm text-white/60">hello@jassoni.co.uk</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Phone size={20} className="text-[#EEFF00]" />
                <h3 className="text-white uppercase tracking-wider">Phone</h3>
              </div>
              <p className="text-sm text-white/60">+44 20 1234 5678</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <MapPin size={20} className="text-[#EEFF00]" />
                <h3 className="text-white uppercase tracking-wider">Location</h3>
              </div>
              <p className="text-sm text-white/60">
                Based in London, UK<br />
                Shipping worldwide
              </p>
            </div>

            <div>
              <h3 className="text-white uppercase tracking-wider mb-3">Follow</h3>
              <div className="flex gap-4 text-sm">
                <a href="#" className="text-white/60 hover:text-[#EEFF00] transition-colors">Instagram</a>
                <a href="#" className="text-white/60 hover:text-[#EEFF00] transition-colors">Twitter</a>
                <a href="#" className="text-white/60 hover:text-[#EEFF00] transition-colors">Facebook</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 text-white/80 uppercase tracking-wider">Name *</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-2 text-white/80 uppercase tracking-wider">Email *</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/80 uppercase tracking-wider">Subject *</label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                />
                {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-sm mb-2 text-white/80 uppercase tracking-wider">Message *</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#EEFF00]"
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                className="px-8 py-4 bg-[#EEFF00] text-black uppercase tracking-wider text-sm hover:bg-[#EEFF00]/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
