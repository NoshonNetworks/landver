import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import WalletConnection from "../WalletConnection";
import { AuthContext } from "../../context/AuthContext";
import { BrowserProvider } from "ethers";

function LocationMarker({ setLocation }) {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            setLocation(`${e.latlng.lat}, ${e.latlng.lng}`);
        },
    });

    return position === null ? null : <Marker position={position} />;
}

function LandRegistrationForm() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [land, setLand] = useState({
        location: "",
        area: "",
        landUse: "",
        document: null,
    });
    const [registrationResult, setRegistrationResult] = useState(null);

    const handleChange = (e) => {
        setLand({ ...land, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setLand({ ...land, document: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            alert("Please connect your wallet first");
            return;
        }

        const formData = new FormData();
        formData.append("location", land.location);
        formData.append("area", land.area.toString());
        formData.append("landUse", land.landUse);
        formData.append("document", land.document);

        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            formData.append("owner", address);

            console.log(
                "Submitting land registration form:",
                Object.fromEntries(formData)
            );

            const response = await axios.post("/api/land/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                timeout: 120000, // Timeout set to 120000ms because it is a blockchain event
            });
            console.log("Land registration response:", response.data);
            setRegistrationResult(response.data);
        } catch (error) {
            console.error("Error registering land:", error);
            console.error("Error response:", error.response?.data);
            alert(
                "Failed to register land: " +
                    (error.response?.data?.error || error.message)
            );
        }
    };

    return (
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom>
                    Register Land
                </Typography>

                <WalletConnection />
                <p className="p-1 text-red-800">
                    Click on map to scroll to designated location and click to
                    add location
                </p>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MapContainer
                            center={[0, 0]}
                            zoom={2}
                            style={{ height: "400px", width: "100%" }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <LocationMarker
                                setLocation={(loc) =>
                                    setLand({ ...land, location: loc })
                                }
                            />
                        </MapContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="location"
                            label="Location"
                            value={land.location}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="area"
                            label="Area (in sq. meters)"
                            type="number"
                            value={land.area}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="landUse"
                            label="Land Use"
                            value={land.landUse}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex justify-between">
                            <div className="w-full">
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileChange}
                                    required
                                    id="certificate-of-occupancy"
                                    style={{ display: "none" }}
                                />
                                <label htmlFor="certificate-of-occupancy">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        color="success"
                                    >
                                        Upload Certificate of Occupancy
                                    </Button>
                                </label>
                                {land.document && (
                                    <Typography variant="body2">
                                        {land.document.name}
                                    </Typography>
                                )}
                            </div>
                            <div className="w-full">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                >
                                    Register Land
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
            </form>
            {registrationResult && (
                <Paper
                    elevation={2}
                    style={{ padding: "20px", marginTop: "20px" }}
                >
                    <Typography variant="h5" gutterBottom>
                        Registration Result
                    </Typography>
                    <Typography>
                        <strong>Land ID:</strong>{" "}
                        {registrationResult.land.landId}
                    </Typography>
                    <Typography>
                        <strong>Owner:</strong> {registrationResult.land.owner}
                    </Typography>
                    <Typography>
                        <strong>Location:</strong>{" "}
                        {registrationResult.land.location}
                    </Typography>
                    <Typography>
                        <strong>Area:</strong> {registrationResult.land.area}{" "}
                        sq. meters
                    </Typography>
                    <Typography>
                        <strong>Land Use:</strong>{" "}
                        {registrationResult.land.landUse}
                    </Typography>
                    <Typography>
                        <strong>Blockchain Transaction Hash:</strong>{" "}
                        {registrationResult.blockchainTransactionHash}
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => navigate("/lands")}
                        style={{ marginTop: "10px" }}
                    >
                        View All Lands
                    </Button>
                </Paper>
            )}
        </Paper>
    );
}

export default LandRegistrationForm;
