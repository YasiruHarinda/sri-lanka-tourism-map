import { FaBus, FaMoneyBillWave, FaPrayingHands, FaTrain } from 'react-icons/fa';

const seasons = [
  {
    region: 'West & south coast',
    months: 'December – April',
    text: 'Calm seas and sunshine for Colombo, Galle, Unawatuna and Mirissa, plus whale watching off the south coast.',
  },
  {
    region: 'East coast',
    months: 'May – September',
    text: 'While the south-west monsoon hits the other side of the island, Trincomalee and Arugam Bay are at their best.',
  },
  {
    region: 'Hill country',
    months: 'January – April',
    text: 'The clearest skies for hiking Horton Plains, climbing Adam\'s Peak and taking the train through the tea estates.',
  },
];

const tips = [
  {
    icon: FaPrayingHands,
    title: 'Temple etiquette',
    text: 'Cover your shoulders and knees, take off shoes and hats, and never pose with your back to a Buddha statue.',
  },
  {
    icon: FaTrain,
    title: 'Book scenic trains early',
    text: 'Reserved seats on the Kandy–Ella line sell out quickly in peak season, so book ahead if you can.',
  },
  {
    icon: FaMoneyBillWave,
    title: 'Carry some cash',
    text: 'Cards work in cities and hotels, but smaller towns, tuk-tuks and park entrances often need rupees (LKR).',
  },
  {
    icon: FaBus,
    title: 'Getting around',
    text: 'Agree tuk-tuk fares before you set off or use a ride-hailing app. Hiring a car with a driver is common for longer trips.',
  },
];

const TravelTips = () => (
  <section id="plan" className="scroll-mt-6 bg-lagoon-dark py-20 text-white">
    <div className="container mx-auto px-4">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-saffron">Plan your trip</p>
      <h2 className="max-w-2xl font-display text-4xl font-bold md:text-5xl">Two monsoons, so it&apos;s always the season somewhere.</h2>
      <p className="mt-4 max-w-2xl text-white/75">
        Sri Lanka&apos;s weather is shaped by two monsoons that hit opposite sides of the island at different times of year.
        Pick a month in the map filters to see what&apos;s in season.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {seasons.map((s) => (
          <div key={s.region} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <p className="text-sm font-semibold text-saffron">{s.months}</p>
            <h3 className="mt-1 font-display text-2xl font-bold">{s.region}</h3>
            <p className="mt-3 text-white/75">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {tips.map(({ icon: Icon, title, text }) => (
          <div key={title}>
            <Icon className="mb-3 text-2xl text-saffron" aria-hidden />
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-white/70">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TravelTips;
