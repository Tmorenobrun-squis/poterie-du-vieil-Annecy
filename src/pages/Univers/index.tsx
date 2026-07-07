import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SectionReveal } from '../../components/ui/SectionReveal'
import { useCart } from '../../contexts/CartContext'

function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

const UNIVERS = [
  {
    label: 'Poterie savoyarde',
    tag: 'Fait main',
    desc: 'Bols, assiettes, vases et tasses aux glaçures naturelles, tournés à la main sur le tour.',
    img: '/images/univers-poterie.jpg',
    items: [
      { name: 'Pichet en céramique bleue', desc: 'Forme poisson, grès émaillé bleu lac, idéal pour la table.', img: '/images/shot-6.jpg' },
      { name: 'Plat à gratin cœurs', desc: 'Va du four à la table, motif cœur rouge savoyard.', img: '/images/shot-18.jpg' },
      { name: 'Bol déjeuner', desc: 'Grand bol céramique blanche pour café au lait et tartines.', img: '/images/galerie-7.jpg' },
    ],
  },
  {
    label: 'Art de la table',
    tag: 'Quotidien',
    desc: 'Tasses, carafes et services pour transformer chaque repas en moment de partage.',
    img: '/images/univers-art-de-la-table.jpg',
    items: [
      { name: 'Service soleil', desc: 'Assiettes et bols jaune vif émaillé, esprit été.', img: '/images/shot-3.jpg' },
      { name: 'Coupelles vert prairie', desc: 'Lot de céramiques vertes assorties pour l\'apéritif.', img: '/images/shot-1.jpg' },
      { name: 'Service rouge tradition', desc: 'Assiettes et bols rouge profond, style savoyard.', img: '/images/shot-10.jpg' },
      { name: 'Cruche bleue du lac', desc: 'Pichet en céramique bleue, parfait pour l\'eau ou le vin.', img: '/images/galerie-4.jpg' },
    ],
  },
  {
    label: 'Déco de montagne',
    tag: 'Inspiration alpine',
    desc: 'Objets décoratifs et pièces d\'inspiration alpine pour réchauffer l\'intérieur.',
    img: '/images/univers-deco-montagne.jpg',
    items: [
      { name: 'Coussin edelweiss', desc: 'Laine feutrée façonnée main, fleur des Alpes, blanc pur.', img: '/images/shot-2.jpg' },
      { name: 'Bouquet feutrine éternel', desc: 'Fleurs en feutrine colorées, ne fanent jamais.', img: '/images/galerie-9.jpg' },
      { name: 'Céramiques déco rouge', desc: 'Collection de pièces décoratives en rouge intense.', img: '/images/galerie-6.jpg' },
    ],
  },
  {
    label: 'Doudous & enfants',
    tag: 'Cadeaux naissance',
    desc: 'Doudous tout doux, veilleuses et petites vaisselles pour les plus jeunes.',
    img: '/images/univers-doudous.jpg',
    items: [
      { name: 'Espace enfants', desc: 'Peluches, doudous et jouets du terroir savoyard.', img: '/images/shot-5.jpg' },
      { name: 'Poulette en céramique', desc: 'Figurine blanche à pois noirs, décor original.', img: '/images/galerie-8.jpg' },
      { name: 'Assiettes colorées enfant', desc: 'Vaisselle céramique aux couleurs vives, lavable au lave-vaisselle.', img: '/images/galerie-2.jpg' },
    ],
  },
  {
    label: 'Bijoux & accessoires',
    tag: 'Artisanat',
    desc: 'Pièces uniques en argent, laiton et matières naturelles, façonnées par le collectif.',
    img: '/images/univers-bijoux.jpg',
    items: [
      { name: 'Céramiques fines', desc: 'Collection de céramiques élégantes, émail patiné.', img: '/images/galerie-1.jpg' },
      { name: 'Linge de table en lin', desc: 'Nappes et serviettes en lin naturel, vichy doré.', img: '/images/shot-15.jpg' },
      { name: 'Assiettes illustrées animaux', desc: 'Chevreuil, hérisson, ours — faïence blanche peinte.', img: '/images/galerie-5.jpg' },
    ],
  },
  {
    label: 'Affiches & illustrations',
    tag: 'Art local',
    desc: 'Vaisselle illustrée, affiches du lac et objets-souvenirs signés par les artisans du collectif.',
    img: '/images/univers-affiches.jpg',
    items: [
      { name: 'Collection animaux des Alpes', desc: 'Plateau et mugs illustrés, faune alpine peinte à la main.', img: '/images/shot-8.jpg' },
      { name: 'Mug souvenir Annecy', desc: 'Mug blanc, illustration montagne et graminées séchées.', img: '/images/shot-20.jpg' },
      { name: 'Vaisselle illustrée', desc: 'Assiettes décorées d\'illustrations fines, édition boutique.', img: '/images/galerie-3.jpg' },
    ],
  },
]

function ProductCard({ name, desc, img, onAdd }: { name: string; desc: string; img: string; onAdd: () => void }) {
  return (
    <div className="bg-sable rounded-2xl overflow-hidden flex flex-col shadow-[0_4px_24px_-8px_rgba(33,29,24,0.12)] border border-argile hover:shadow-[0_8px_32px_-8px_rgba(33,29,24,0.18)] transition-shadow duration-300">
      {/* Photo produit */}
      <div className="aspect-[4/3] overflow-hidden bg-argile">
        <img
          src={img}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.04]"
        />
      </div>
      {/* Contenu */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-fraunces font-semibold text-encre text-[15px] leading-snug">
          {name}
        </h3>
        <p className="font-mulish text-pierre text-[12.5px] leading-relaxed flex-1">
          {desc}
        </p>
        <button
          type="button"
          onClick={onAdd}
          className="mt-1 w-full border-[1.5px] border-terracotta text-terracotta bg-transparent px-3 py-2 rounded-full font-mulish font-semibold text-[11px] sm:text-[12.5px] cursor-pointer hover:bg-terracotta hover:text-sable transition-colors duration-200 leading-snug"
        >
          + Ajouter à ma commande
        </button>
      </div>
    </div>
  )
}

export default function UniversPage() {
  useMeta(
    'Nos univers — La Poterie du Vieil Annecy',
    'Explorez nos univers artisanaux : poterie savoyarde, art de la table, déco de montagne, bijoux, doudous et illustrations. Boutique à Annecy.',
  )

  const { addToCart } = useCart()
  const navigate = useNavigate()

  function handleAdd(name: string) {
    addToCart(name)
    navigate('/commander')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* En-tête page */}
      <div
        className="pt-[100px] md:pt-[120px] pb-12 md:pb-16 px-5 md:px-8 text-center"
        style={{ background: 'linear-gradient(160deg, #EDE4D3 0%, #FAF6EF 100%)' }}
      >
        <div className="max-w-[760px] mx-auto">
          <motion.span
            className="font-caveat text-terracotta text-[22px] block mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            vitrine · sans prix en ligne
          </motion.span>
          <motion.h1
            className="font-fraunces font-semibold text-encre leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', letterSpacing: '0.04em' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            Nos univers
          </motion.h1>
          <motion.p
            className="font-mulish text-[16px] text-pierre leading-relaxed max-w-[560px] mx-auto"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            Ajoutez les pièces qui vous plaisent à votre demande. La boutique vous recontacte
            pour confirmer la disponibilité et le prix — aucun paiement en ligne.
          </motion.p>
        </div>
      </div>

      {/* Catalogue par univers */}
      <section className="bg-sable" aria-label="Nos six univers">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-12 md:py-16">
          {UNIVERS.map((univers, i) => (
            <div key={univers.label} className={i < UNIVERS.length - 1 ? 'mb-20' : ''}>

              {/* En-tête catégorie */}
              <SectionReveal delay={i * 0.03}>
                <div className="pb-5 mb-8 border-b border-dashed" style={{ borderColor: '#CBB48E60' }}>
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <span className="text-or text-[18px]" aria-hidden="true">✻</span>
                    <h2
                      className="font-fraunces font-semibold text-encre"
                      style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', letterSpacing: '0.03em' }}
                    >
                      {univers.label}
                    </h2>
                    <span className="text-[11px] font-mulish font-bold text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full tracking-wide uppercase">
                      {univers.tag}
                    </span>
                  </div>
                  <p className="font-mulish text-pierre text-[14px] leading-relaxed pl-7">
                    {univers.desc}
                  </p>
                </div>
              </SectionReveal>

              {/* Grille : photo catégorie + cartes produits */}
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">

                {/* Photo ambiance catégorie */}
                <SectionReveal delay={i * 0.03 + 0.05} variant="clip">
                  <div className="rounded-2xl overflow-hidden shadow-[0_8px_32px_-8px_rgba(33,29,24,0.15)]" style={{ aspectRatio: '3/4' }}>
                    <img
                      src={univers.img}
                      alt={univers.label}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SectionReveal>

                {/* Grille produits */}
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {univers.items.map((item, j) => (
                    <SectionReveal key={item.name} delay={i * 0.03 + j * 0.05 + 0.08} variant="blur">
                      <ProductCard
                        name={item.name}
                        desc={item.desc}
                        img={item.img}
                        onAdd={() => handleAdd(item.name)}
                      />
                    </SectionReveal>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bandeau bas */}
      <section className="bg-argile border-t border-or/20" aria-label="Venez nous voir">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-14 md:py-16 text-center">
          <SectionReveal>
            <p className="font-fraunces italic text-encre/70 text-[18px] md:text-[21px] leading-relaxed max-w-[560px] mx-auto mb-8" style={{ letterSpacing: '0.02em' }}>
              « La meilleure façon de découvrir nos univers ? Venir les toucher. »
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                to="/commander"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-terracotta text-sable font-mulish font-semibold text-[14px] hover:bg-terracotta/85 transition-colors duration-200 shadow-[0_8px_20px_-10px_rgba(162,58,46,0.6)]"
              >
                Faire une demande de commande
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-encre/20 text-encre font-mulish font-semibold text-[14px] hover:bg-sable transition-colors duration-200"
              >
                Voir les horaires
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </motion.div>
  )
}
