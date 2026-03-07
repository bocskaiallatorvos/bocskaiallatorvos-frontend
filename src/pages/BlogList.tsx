import { useEffect, useState } from 'react';
import { BlogCard } from '../components/blog/BlogCard';
import { Loader2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { WPPosts } from '../interfaces/WordpressInterfaces';
import Pagination from '../components/Pagination';

const POSTS_PER_PAGE = 4;

export function BlogList() {
    const [blogs, setPosts] = useState<WPPosts[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const { posts, error } = useCms();


    useEffect(() => {
        async function fetchPosts() {
            try {
                setLoading(true);
                if (error) throw error;

                //const blogPosts = posts.filter(item => item.categories.includes(8));
                const blogPosts = posts
                .filter(item => item.categories.includes(8))
                .sort((a, b) => 
                     new Date(b.date_gmt).getTime() - new Date(a.date_gmt).getTime()
                );
    

                setTotalCount(blogPosts.length || 0);

                const from = (currentPage - 1) * POSTS_PER_PAGE;
                const to = from + POSTS_PER_PAGE;

                const selectedBlogPosts = blogPosts.slice(from, to);
                setPosts(selectedBlogPosts || []);
            } catch (err) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, [currentPage]);

    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-brandHeaderColor text-lg">Blogok betöltése...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                        <p className="text-brandHeaderColor font-medium mb-2">Hiba a blog bejegyzéseinek betöltése közben! </p>
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section id="blogPosts" className="py-20 min-h-screen bg-gradient-to-b from-brand to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl font-bold text-brandHeaderColor mb-8 text-center">
                        Blog
                    </h1>
                    {/*<p className="text-xl sm:text-2xl text-brandColor max-w-3xl mx-auto leading-relaxed">
                        Minden, amit tudni érdemes az állatgyógyászatról és kezelésekről
                    </p>*/}
                </header>

                {blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-brandHeaderColor text-lg">Jelenleg nincsenek elérhető blog bejegyzések.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {blogs.map((post, index) => (
                                <BlogCard key={post.id} post={post} index={index} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={goToPage}
                            />
                        )}

                        <div className="mt-12 text-center">
                            <p className="text-brandHeaderColor">
                                Összesen <span className="font-semibold text-brandColor">{totalCount}</span> blogbejegyzés
                            </p>
                        </div>

                    </>
                )}
            </div>
        </section>
    );
}
