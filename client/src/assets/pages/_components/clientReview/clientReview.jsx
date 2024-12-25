import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { getRegulatoryDocuments, getDocumentFileUrl } from "../../../api/documentApi/documentApi";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const fetchedDocuments = await getRegulatoryDocuments();
        setDocuments(fetchedDocuments);
      } catch (err) {
        setError(err.message || "Ошибка при загрузке документов");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", marginTop: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Загрузка документов...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Alert severity="error">Ошибка: {error}</Alert>
      </Container>
    );
  }

  if (documents.length === 0) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h6" color="textSecondary" align="center">
          Нет доступных документов.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4}}>
      <Typography variant="h4" gutterBottom align="center">
        Список нормативных документов
      </Typography>
      <Grid container spacing={3}>
        {documents.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {doc.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Дата утверждения: {doc.approvalDate}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {doc.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  href={getDocumentFileUrl(doc.file)}
                  download
                >
                  Скачать файл
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DocumentList;
