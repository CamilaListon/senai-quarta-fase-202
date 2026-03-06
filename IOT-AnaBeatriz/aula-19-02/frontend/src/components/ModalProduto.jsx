const ModalProduto = ({ open, onClose, title, children, onSave }) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "20px",
          zIndex: 1001,
          width: "400px",
          borderRadius: "8px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <div>{children}</div>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button onClick={onClose} style={{ marginRight: "10px" }}>Fechar</button>
          <button onClick={onSave}>Salvar</button>
        </div>
      </div>
    </>
  );
};

export default ModalProduto;