import { useState, useEffect } from 'react';
import { PriceList } from '../interfaces/PriceListInterface';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import * as LucideIcons from "lucide-react";

const icons = LucideIcons as unknown as Record<string, React.ComponentType<any>>;
const apiUrl = import.meta.env.VITE_API_URL;

function Pricelists() {
    const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());
    const [priceLists, setData] = useState<PriceList[]>([]);

    useEffect(() => {
        fetch(`${apiUrl}/prices`)
            .then((res) => res.json())
            .then((json: PriceList[]) => {
                setData(json);

                const allIds = json.map((item) => item.id);
                setExpandedTables(new Set(allIds));
            })
            .catch((err) => console.error("API hiba:", err));
    }, []);

    const toggleTable = (id: string) => {
        setExpandedTables((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-brand via-white to-white py-20 px-4">
            <div className="container max-w-5xl mx-auto space-y-6 py-12">
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl font-bold text-brandHeaderColor mb-3 flex items-center justify-center gap-3">
                        Árlisták
                    </h1>
                    <p className="text-brandColor text-xl sm:text-2xl">Szolgáltatásaink áttekintése</p>
                </div>

                {priceLists.map((priceList, index) => {
                    const IconComponent = icons[(priceList.icon as string) || "Clipboard"];
                    const isExpanded = expandedTables.has(priceList.id);

                    return (
                        <div
                            key={priceList.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl animate-slide-up"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div
                                className="p-6 cursor-pointer transition-all duration-300 group"
                                style={{ backgroundColor: '#f7f4f2' }}
                                onClick={() => toggleTable(priceList.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-slate-200/50 p-3 rounded-xl transition-transform duration-300 group-hover:scale-110">
                                            {IconComponent && (
                                                <IconComponent className="w-6 h-6 text-brandButton" />
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-brandHeaderColor mb-1">{priceList.title}</h2>
                                            <div className="flex items-center gap-2 text-brandColor text-sm">
                                                <Calendar className="w-4 h-4" />
                                                <span>Érvényes: {priceList.valid_from}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-200/50 p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
                                        {isExpanded ? (
                                            <ChevronUp className="w-6 h-6 text-slate-700 transition-transform duration-300" />
                                        ) : (
                                            <ChevronDown className="w-6 h-6 text-slate-700 transition-transform duration-300" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`transition-all duration-500 ease-in-out ${isExpanded ? ' opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-3 sm:p-6">
                                    {/* Desktop table view */}
                                    <div className="hidden sm:block">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b-2 border-slate-200">
                                                    <th className="text-left py-4 px-4 text-slate-700 font-semibold text-sm uppercase tracking-wider">
                                                        Szolgáltatás
                                                    </th>
                                                    <th className="text-right py-4 px-4 text-slate-700 font-semibold text-sm uppercase tracking-wider">
                                                        Ár
                                                    </th>
                                                    {/*<th className="text-right py-4 px-4 text-slate-700 font-semibold text-sm uppercase tracking-wider">
                                                    Megjegyzés
                                                </th>*/}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {priceList.items.map((item, itemIndex) => (
                                                    <tr
                                                        key={itemIndex}
                                                        className="border-b border-slate-100 transition-all duration-300 animate-fade-in-row group"
                                                        style={{
                                                            animationDelay: `${itemIndex * 50}ms`,
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.backgroundColor = '#F7FEE7';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.backgroundColor = '';
                                                        }}
                                                    >
                                                        <td className="py-4 px-4 text-slate-800 font-medium transition-all duration-300">
                                                            <div className="flex items-center gap-3">
                                                                <span className="w-2 h-2 rounded-full bg-brandButton opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                                                <span className="transition-colors duration-300 group-hover:text-black">
                                                                    {item.service}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4 text-right">
                                                            <span className="inline-flex items-center gap-1 font-bold text-slate-800 transition-all duration-300 group-hover:scale-105 group-hover:text-black whitespace-nowrap">
                                                                {item.price}
                                                            </span>
                                                        </td>
                                                        {/*<td className="py-4 px-4 text-right text-slate-600 text-sm transition-colors duration-300 group-hover:text-black">
                                                        {item.note && `/ ${item.note}`}
                                                    </td>*/}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile card view */}
                                    <div className="sm:hidden space-y-3">
                                        {priceList.items.map((item, itemIndex) => (
                                            <div
                                                key={itemIndex}
                                                className="border border-slate-200 rounded-lg p-3 bg-white animate-fade-in-row"
                                                style={{
                                                    animationDelay: `${itemIndex * 50}ms`,
                                                }}
                                            >
                                                <div className="text-slate-800 font-medium mb-2">
                                                    {item.service}
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-slate-800 text-lg">
                                                        {item.price}
                                                    </span>
                                                    {/*{item.note && (
                                                    <span className="text-slate-600 text-sm italic">
                                                        / {item.note}
                                                    </span>
                                                )}*/}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Pricelists;
