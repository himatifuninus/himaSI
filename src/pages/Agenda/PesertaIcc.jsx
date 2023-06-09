import Navbar from "../../components/Navbar";
import logoIcc from "../../assets/logo-icc-season2.png";
import db from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PesertaIcc = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const booksCollectionRef = collection(db, "users");

  const getUsers = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const sortedData = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.nama.localeCompare(b.nama));
      setUsers(sortedData);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <FontAwesomeIcon
          icon="fa-solid fa-circle-notch"
          spin
          size="2xl"
          style={{ color: "#6056DB" }}
        />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="container  mx-auto pt-24 p-6 font-inter mt-[10vw] md:mt-[5vw] lg:mt-[1vw]">
        <div className="grid place-items-center">
          <img
            src={logoIcc}
            alt="icc-season-2"
            className="w-[15vw] md:w-[8vw] lg:w-[7vw] xl:w-[5vw]"
          />
        </div>
        <div className="text-center max-w-md mx-auto md:w-full pb-5 mt-[2vw]">
          <h1 className="text-3xl font-bold font-poppins">
            Peserta ICC Season 2
          </h1>
        </div>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-white  bg-[#6056DB] uppercase border-b border-gray-600">
                  <th className="px-4 py-3">No</th>

                  <th className="px-4 py-3">Nama</th>
                  <th className="px-4 py-3">NIM</th>
                  <th className="px-4 py-3">Kelas</th>
                  <th className="px-4 py-3">Angkatan</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {users.map((users, index) => {
                  return (
                    <tr className="text-gray-700" key={users.id}>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <p className="font-semibold text-black">
                            {index + 1}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <p className="font-semibold capitalize text-black">
                            {users.nama}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <p className="font-semibold text-black">
                            {users.nim}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <p className="font-semibold capitalize text-black">
                            {users.kelas}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <p className="font-semibold  text-black">
                            {users.angkatan}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default PesertaIcc;
