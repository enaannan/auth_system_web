import { Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "../services/authService";
import { logout } from "../utils/utils";

interface UserProfile {
    id: string;
    username: string;
    email: string;
  }

  
const Profile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const getProfile = async () => {
          try {
            const data = await fetchUserProfile();
            setProfile(data); 
          } catch (error) {
            setError("Failed to fetch profile");
          } finally {
            setLoading(false);
          }
        };
    
        getProfile();
      }, []);
      
      if (loading) {
        return <CircularProgress />;
      }
    
      if (error) {
        return <Typography color="error">{error}</Typography>;
      }
    
      if (!profile) {
        return <Typography>No profile data available</Typography>;
      }

  return (
    <Card variant="outlined" className="max-w-md mx-auto my-4">
      <CardContent>
        <Typography variant="h5" component="div">
          Profile Details
        </Typography>
        <Typography color="text.secondary">
    User ID: {profile.id}
        </Typography>
        <Typography variant="body1">
            <strong>Username:</strong> {profile.username}
        </Typography>
        <Typography variant="body1">
            <strong>Email:</strong> {profile.email}
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => logout()}
          style={{ marginTop: '20px' }}
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default Profile;

