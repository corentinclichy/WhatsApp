import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="https://img.icons8.com/clouds/500/000000/whatsapp.png"
          alt=""
          style={{ marginBottom: 10 }}
          height={200}
        />
        <Circle color="#3CBC28" size={60} />
      </div>
    </center>
  );
}

export default Loading;
