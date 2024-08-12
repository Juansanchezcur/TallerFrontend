// eslint-disable-next-line react/prop-types
const Informe = ({ dato, dia, horas, minutos }) => {
  return (
    <div>
      <h4>{dato}</h4>
      <p>
        {dato} en el día: {dia}
      </p>
      <p>
        Último hace: {horas} horas y {minutos} minutos
      </p>
    </div>
  );
};

export default Informe;
