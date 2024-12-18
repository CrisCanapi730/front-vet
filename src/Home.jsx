import { useEffect, useState } from 'react';
import './styles/Home.css';

const Home = () => {
    
    const [dynamicText, setDynamicText] = useState('confiable');
    const [color, setColor] = useState('color1');

    // Tarjetas de información
    const cards = [
        {
            title: 'Operaciones',
            description: 'Ofrecemos consultas personalizadas para el cuidado de tu mascota.',
            image: 'https://www.nosequeestudiar.net/site/assets/files/2167700/veterinario_en_su_trabajo.jpg'
        },
        {
            title: 'Vacunación',
            description: 'Mantén a tus mascotas protegidas con nuestras vacunas recomendadas.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCTgp7h2URuFKGaIWXV_VaOVqq0mWWakEByQ&s'
        },
        {
            title: 'Productos de Calidad',
            description: 'Contamos con un amplio catálogo de alimentos y accesorios.',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPZnpDRJE-Mvo6rTGFnsBFTrzC4G3uzud3Jw&s'
        }
    ];

    useEffect(() => {
        const texts = [
            { text: 'confiable', color: 'color1' },
            { text: 'con experiencia', color: 'color2' },
            { text: 'amante de los animales', color: 'color3' },
            { text: 'familiar', color: 'color4' },
            { text: 'dedicada', color: 'color5' }
        ];
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % texts.length;
            setDynamicText(texts[index].text);
            setColor(texts[index].color);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="Home">
            <h1 className='Titulo'>Veterinaria Patito, una veterinaria <span className={color}>{dynamicText}</span></h1>
            <p>En Veterinaria Patito, somos especialistas en el cuidado y bienestar de tus mascotas. Nuestro compromiso es brindarles la mejor atención y servicios personalizados.</p>
            <p>Nos enorgullece ser una veterinaria de Bolivia, comprometida con la salud y felicidad de todas las mascotas. Ya sea que tengas perros, gatos u otros animales, contamos con los recursos y conocimientos para ofrecer el mejor servicio.</p>
            <p>Además de consultas veterinarias, ofrecemos un amplio catálogo de productos de alta calidad, incluyendo alimentos, accesorios y medicinas para cubrir todas las necesidades de tus mascotas.</p>
            <p>¿Tienes más de una mascota? Con nuestro sistema, puedes registrar a cada una de ellas y llevar un control detallado de sus consultas, vacunas y tratamientos.</p>
            <p>Somos reconocidos por la calidez y profesionalismo de nuestro equipo. Con más de 10 años de experiencia en el rubro, nos hemos consolidado como la veterinaria más confiable de la región.</p>
            
            <div className="sliding-bar">
                <div className="sliding-text">
                    Ofrecemos servicios confiables y dedicados para el bienestar de tu mascota.
                </div>
            </div>
            {/* Imagen centrada */}
            <img 
                src="https://img.freepik.com/foto-gratis/veterinaria-feliz-sonriendo-acariciando-hermoso-perro-beagle-mesa-examen-veterinario-profesional-sosteniendo-mascota-mientras-examina-mascota-sana-clinica_662251-2251.jpg" 
                alt="Veterinaria Patito" 
                className="home-image" 
            />

            {/* Tarjetas Informativas */}
            <div className="card-container">
                {cards.map((card, index) => (
                    <div className="card" key={index}>
                        <div className="card-inner">
                            <div className="card-front">
                                <h2>{card.title}</h2>
                                <img src={card.image} alt={card.title} className="card-image" />
                            </div>
                            <div className="card-back">
                                <p>{card.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
