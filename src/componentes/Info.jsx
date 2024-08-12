// eslint-disable-next-line react/prop-types
const Info = ({ minutos, excedido }) => {
  // Estilo para el texto dependiendo del estado
  const estilo = {
    color: excedido ? "red" : "green",
  };

  return (
    <div>
      <h4>Tiempo restante para el próximo Biberón</h4>
      {minutos === null ? (
        <p>Todavía hay registros de biberones ingeridos</p>
      ) : (
        <p style={estilo}>
          {excedido
            ? `Tiempo excedido: ${Math.round(minutos / 60)} horas y ${
                minutos % 60
              } minutos`
            : `Tiempo restante: ${Math.round(minutos / 60)} horas y ${
                minutos % 60
              } minutos`}
        </p>
      )}
    </div>
  );
};

export default Info;
