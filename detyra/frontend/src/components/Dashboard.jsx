import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const books = [
    {
        id: 1,
        title: 'Kodi i Da Vinçit',
        author: 'Dan Brown',
        description: 'Një thriller intelektual që përzien artin, historinë dhe misterin. Robert Langdon përfshihet në një kërkim të rrezikshëm për të zbuluar një sekret të lashtë.',
        image: '/images/book1.jpg',
        summary: 'Një vrasje në Louvre fillon një hetim të mbushur me simbole të fshehta dhe kode misterioze.'
    },
    {
        id: 2,
        title: '1984',
        author: 'George Orwell',
        description: 'Një roman distopik që paraqet një shoqëri të kontrolluar nga një regjim totalitar ku "Big Brother" të sheh gjithmonë.',
        image: '/images/book2.jpg',
        summary: 'Winston Smith sfidon sistemin duke kërkuar të vërtetën dhe lirinë mendore.'
    },
    {
        id: 3,
        title: 'Të vrasësh zogun përqeshës',
        author: 'Harper Lee',
        description: 'Një histori prekëse për drejtësinë dhe paragjykimin racor në Amerikën e Jugut gjatë viteve 1930.',
        image: '/images/book3.jpg',
        summary: 'Avokati Atticus Finch mbron një njeri të pafajshëm me ngjyrë të akuzuar për një krim të rëndë.'
    },
    {
        id: 4,
        title: 'Alkimisti',
        author: 'Paulo Coelho',
        description: 'Një histori filozofike mbi ndjekjen e ëndrrave dhe zbulimin e vetvetes përmes një udhëtimi shpirtëror.',
        image: '/images/book4.jpg',
        summary: 'Një djalosh andaluzian shkon në Egjipt në kërkim të një thesari dhe gjen diçka më të madhe.'
    },
    {
        id: 5,
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
        description: 'Një roman klasik rus për dashurinë, tradhtinë dhe tragjedinë njerëzore në aristokracinë ruse.',
        image: '/images/book5.jpg',
        summary: 'Anna përjeton pasionin dhe dhimbjen përmes një lidhjeje që sfidon normat shoqërore.'
    },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            toast.error('Nuk jeni i autorizuar!');
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-yellow-200 text-gray-900">
            <h1 className="text-center text-4xl italic font-light text-yellow-800 mt-6">
                Mirë se erdhe në Blogun e Librave, {user && user.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-8">
                {books.map(book => (
                    <div key={book.id} className="border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300">
                        <img src={book.image} alt={book.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{book.title}</h2>
                            <p className="text-sm text-gray-600 italic">nga {book.author}</p>
                            <p className="text-sm mt-2 text-gray-700">{book.description}</p>
                            <button
                                onClick={() => setSelectedBook(book)}
                                className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition"
                            >
                                Lexo më shumë
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedBook && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
                        <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
                        <p className="text-sm italic text-gray-600 mb-4">nga {selectedBook.author}</p>
                        <p className="text-gray-800">{selectedBook.description}</p>
                        <p className="mt-4 font-medium text-gray-700">{selectedBook.summary}</p>
                        <button
                            onClick={() => setSelectedBook(null)}
                            className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Mbyll
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
