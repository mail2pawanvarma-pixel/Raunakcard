/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, MessageCircle, Mail, MapPin, Download, Share2, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function App() {
  const contactInfo = {
    name: "Raunak Agrawal",
    phone: "9238444024",
    whatsapp: "9238452041",
    email: "agrawalraunak320@gmail.com",
    address: "In front of Punjab Garden, near Maruti Suzuki showroom, Ambikapur",
    photoUrl: "https://i.ibb.co/xSBTS6m0/file-00000000d17c51f79c53a236bcdc6f64-conversation-id-67ebe60b-dffc-8007-9c77-69340d88373b-message-i.png"
  };

  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const handleDownloadVCard = () => {
    // Enhanced vCard for better compatibility
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contactInfo.name}`,
      `N:Agrawal;Raunak;;;`,
      `TEL;TYPE=CELL,VOICE:${contactInfo.phone}`,
      `TEL;TYPE=WORK,INTERNET:${contactInfo.whatsapp}`,
      `EMAIL;TYPE=PREF,INTERNET:${contactInfo.email}`,
      `ADR;TYPE=WORK,POSTAL,PARCEL:;;${contactInfo.address};Ambikapur;;;India`,
      'REV:' + new Date().toISOString(),
      'END:VCARD'
    ].join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${contactInfo.name.replace(/\s+/g, '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${contactInfo.name}'s Digital Card`,
      text: `Connect with ${contactInfo.name} via this digital visiting card.`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopyFeedback(true);
        setTimeout(() => setShowCopyFeedback(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-sans">
      {/* Toast Feedback */}
      {showCopyFeedback && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-2xl text-sm font-medium"
        >
          Link copied to clipboard!
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-neutral-200/50 overflow-hidden border border-neutral-100"
      >
        {/* Header Background */}
        <div className="h-32 bg-linear-to-r from-neutral-800 to-neutral-900 relative">
          <button 
            onClick={handleShare}
            className="absolute top-4 right-4 p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all text-white active:scale-90"
            title="Share Card"
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Profile Section */}
        <div className="relative px-6 pb-8 -mt-16 text-center">
          <div className="inline-block p-1.5 bg-white rounded-full shadow-lg mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-neutral-100 border-2 border-white">
              <img 
                src={contactInfo.photoUrl} 
                alt={contactInfo.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(contactInfo.name)}&background=f5f5f5&color=171717&size=128`;
                }}
              />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-1">{contactInfo.name}</h1>
          <p className="text-neutral-500 text-sm font-medium uppercase tracking-widest mb-6">Digital Visiting Card</p>

          {/* Contact Details List */}
          <div className="space-y-4 text-left mb-8">
            <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-neutral-50 transition-colors group">
              <div className="p-2.5 bg-neutral-100 rounded-xl group-hover:bg-white transition-colors">
                <Phone size={18} className="text-neutral-600" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Phone</p>
                <a href={`tel:${contactInfo.phone}`} className="text-neutral-800 font-medium hover:text-neutral-950 transition-colors">
                  +91 {contactInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-neutral-50 transition-colors group">
              <div className="p-2.5 bg-neutral-100 rounded-xl group-hover:bg-white transition-colors">
                <MessageCircle size={18} className="text-neutral-600" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">WhatsApp</p>
                <a href={`https://wa.me/91${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-neutral-800 font-medium hover:text-neutral-950 transition-colors">
                  +91 {contactInfo.whatsapp}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-neutral-50 transition-colors group">
              <div className="p-2.5 bg-neutral-100 rounded-xl group-hover:bg-white transition-colors">
                <Mail size={18} className="text-neutral-600" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Email</p>
                <a href={`mailto:${contactInfo.email}`} className="text-neutral-800 font-medium hover:text-neutral-950 transition-colors break-all">
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-neutral-50 transition-colors group">
              <div className="p-2.5 bg-neutral-100 rounded-xl group-hover:bg-white transition-colors">
                <MapPin size={18} className="text-neutral-600" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Address</p>
                <p className="text-neutral-800 font-medium text-sm leading-relaxed">
                  {contactInfo.address}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${contactInfo.phone}`}
              className="flex items-center justify-center gap-2 py-4 bg-neutral-900 text-white rounded-2xl font-semibold shadow-lg shadow-neutral-900/20 hover:bg-neutral-800 transition-all"
            >
              <Phone size={18} />
              Call Now
            </motion.a>
            
            <div className="grid grid-cols-2 gap-3">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/91${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 bg-emerald-50 text-emerald-700 rounded-2xl font-semibold border border-emerald-100 hover:bg-emerald-100 transition-all"
              >
                <MessageCircle size={18} />
                WhatsApp
              </motion.a>
              
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:${contactInfo.email}`}
                className="flex items-center justify-center gap-2 py-4 bg-blue-50 text-blue-700 rounded-2xl font-semibold border border-blue-100 hover:bg-blue-100 transition-all"
              >
                <Mail size={18} />
                Email
              </motion.a>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownloadVCard}
                className="flex items-center justify-center gap-2 py-4 bg-neutral-50 text-neutral-700 rounded-2xl font-semibold border border-neutral-200 hover:bg-neutral-100 transition-all"
              >
                <Download size={18} />
                Save Contact
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="flex items-center justify-center gap-2 py-4 bg-neutral-50 text-neutral-700 rounded-2xl font-semibold border border-neutral-200 hover:bg-neutral-100 transition-all"
              >
                <Share2 size={18} />
                Share Card
              </motion.button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 py-4 text-center border-t border-neutral-100">
          <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-[0.2em]">
            Professional Digital Card
          </p>
        </div>
      </motion.div>
    </div>
  );
}
