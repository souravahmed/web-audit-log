import React, { useState } from "react";
import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { SiteService } from "../../services/siteService";
import moment from "moment";
import { DATE_TIME_FORMAT } from "../../const";

export const SiteForm = () => {
  const defaultValues = {
    name: "",
    location: "",
    description: "",
    latitude: 0,
    longitude: 0,
  };

  const [formData, setFormData] = useState(defaultValues);

  const [site, setSite] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = site?._id
      ? await SiteService.updateSite(site._id, formData)
      : await SiteService.createSite(formData);
    const response = site?._id
      ? { ...data._doc, createdUser: data.createdUser }
      : data;
    setSite(response);
  };
  const handleCancel = () => {
    setFormData(defaultValues);
    setSite({});
  };
  return (
    <Paper
      sx={{
        width: "60%",
        boxShadow: "none",
        padding: "20px",
        border: "2px solid whitesmoke",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack direction="row" gap={2}>
          <Button type="submit" variant="outlined" startIcon={<SaveIcon />}>
            save
          </Button>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            sx={{ color: "black" }}
            onClick={handleCancel}
          >
            cancel
          </Button>
        </Stack>
        <Divider sx={{ marginTop: "20px" }} />
        <Typography
          sx={{
            paddingTop: "10px",
            marginLeft: "20px",
          }}
        >
          Site Id: {site?._id ?? 1}
        </Typography>
        <Stack sx={{ marginTop: "30px" }} gap={2}>
          <TextField
            variant="outlined"
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            variant="outlined"
            label="Jurisdiction/City/Region"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
          <TextField
            variant="outlined"
            label="Site Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Stack direction="row" gap={4}>
            <TextField
              variant="outlined"
              label="Latitude"
              type="number"
              value={formData.latitude}
              onChange={(e) =>
                setFormData({ ...formData, latitude: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              label="Longitude"
              type="number"
              value={formData.longitude}
              onChange={(e) =>
                setFormData({ ...formData, longitude: e.target.value })
              }
            />
          </Stack>
          <Stack
            sx={{
              backgroundColor: "lightgray",
              padding: "15px",
            }}
          >
            <Typography sx={{ fontSize: "16px", color: "gray" }}>
              Audit Log:
            </Typography>
            <Divider sx={{ margin: "10px 0" }} />
            <Typography sx={{ fontSize: "14px" }}>
              created by {site?.createdUser ?? site?.name} on
              {site?.createdAt
                ? moment(site.createdAt).format(DATE_TIME_FORMAT)
                : ""}
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              updated by {site?.name} on
              {site?.updatedAt
                ? moment(site.updatedAt).format(DATE_TIME_FORMAT)
                : ""}
            </Typography>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};
