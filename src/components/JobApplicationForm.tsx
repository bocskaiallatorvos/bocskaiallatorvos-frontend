import { useState } from 'react';
import { Send, User, Mail, Phone, X } from 'lucide-react';

interface ApplicationFormProps {
    jobTitle: string;
    onClose: () => void;
}

export default function JobApplicationForm({ jobTitle, onClose }: ApplicationFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = encodeURIComponent(`Jelentkezés az ${jobTitle} állásra`);
        const body = encodeURIComponent(
            `Kedves Hölgyem/Uram!\n\n${formData.name} vagyok, és szeretnék jelentkezni az Önök által meghirdetett állásra.\n\nElérhetőségem:\n${formData.name}\n${formData.phone}`
        );

        const mailtoLink = `mailto:karrier@cegnev.hu?subject=${subject}&body=${body}&reply-to=${formData.email}`;
        window.location.href = mailtoLink;
    };

    const isFormValid = formData.name && formData.email && formData.phone;

    const mailtoLink = isFormValid
        ? `mailto:${formData.email}
?subject=${encodeURIComponent("Állásjelentkezés")}
&body=${encodeURIComponent(
            `Kedves Hölgyem/Uram!

${formData.name} vagyok, és szeretnék jelentkezni az Önök által meghirdetett állásra.

Elérhetőségem:
Név: ${formData.name}
Email: ${formData.email}
Telefonszám: ${formData.phone}
`
        )}`
        : "#";

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-slide-up">
                <div className="relative bg-brandButtonHover text-white p-6 rounded-t-2xl">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-bold mb-2">Jelentkezés</h2>
                    <p className="text-blue-100 text-sm">{jobTitle}</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teljes név *
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Kovács János"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email cím *
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="kovacs.janos@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Telefonszám *
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="+36 20 123 4567"
                            />
                        </div>
                    </div>

                    <div className="pt-4 space-y-3">
                        <a
                            href={mailtoLink}
                            aria-disabled={!isFormValid}
                            className="w-full bg-brandButton text-white py-3 px-6 rounded-lg font-medium hover:bg-brandButtonHover disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
                        >
                            <Send className="w-5 h-5 mr-2" />
                            Jelentkezés elküldése!
                        </a>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                            Mégse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
