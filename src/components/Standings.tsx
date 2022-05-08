import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { StandingsData } from "../Types";
import { domainToASCII } from "url";

function Standings() {
  const [standings, setStandings] = useState<StandingsData>();

  useEffect(() => {
    axios
      .get("https://f1sitebackend.azurewebsites.net/api/Standings/current")
      .then((dt: AxiosResponse) => {
        setStandings(dt.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <main>
      <div className="spec-div standings-div">Standings</div>
      <div
        className="container mb-5"
        style={{
          width: "80vw",
        }}
      >
        <div className="table-responsive">
          <table className="table text-light table-hover">
            <thead className="bg-dark">
              <tr>
                <th scope="col">Position</th>
                <th scope="col">Given Name</th>
                <th scope="col">Family Name</th>
                <th scope="col">Team</th>
                <th scope="col">Country</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {standings?.mrData.standingsTable.standingsLists[0].driverStandings.map(
                (dr) => {
                  return (
                    <tr
                      key={dr.driver.driverId}
                      className="table-row"
                      onClick={() => {
                        window.location.href = dr.driver.url;
                      }}
                    >
                      <td>{dr.position}.</td>
                      <td>{dr.driver.givenName}</td>
                      <td>{dr.driver.familyName}</td>
                      <td>{dr.constructors[0]?.name}</td>
                      <td>{dr.driver.nationality}</td>
                      <td>{dr.points}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Standings;
