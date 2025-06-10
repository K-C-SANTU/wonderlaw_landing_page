import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  Stack,
  FormHelperText,
} from '@mui/material';

interface UserInfo {
  name: string;
  email: string;
  mobile: string;
  pinCode: string;
  termsAccepted: boolean;
}

interface UserInfoFormProps {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name should be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name should only contain letters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  mobile: Yup.string()
    .required('Mobile number is required')
    .matches(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  pinCode: Yup.string()
    .required('PIN code is required')
    .matches(/^[1-9][0-9]{5}$/, 'Invalid Indian PIN code'),
  termsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

const UserInfoForm: React.FC<UserInfoFormProps> = ({ userInfo, setUserInfo }) => {
  const formik = useFormik({
    initialValues: userInfo,
    validationSchema,
    onSubmit: (values) => {
      setUserInfo(values);
    },
    validateOnMount: true,
  });

  React.useEffect(() => {
    if (formik.isValid) {
      setUserInfo(formik.values);
    }
  }, [formik.values, formik.isValid]);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>
      
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Full Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            placeholder="Enter your full name"
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            placeholder="example@email.com"
          />

          <TextField
            fullWidth
            id="mobile"
            name="mobile"
            label="Mobile Number"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            placeholder="10-digit mobile number"
            inputProps={{ maxLength: 10 }}
          />

          <TextField
            fullWidth
            id="pinCode"
            name="pinCode"
            label="PIN Code"
            value={formik.values.pinCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
            helperText={formik.touched.pinCode && formik.errors.pinCode}
            placeholder="6-digit PIN code"
            inputProps={{ maxLength: 6 }}
          />

          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formik.values.termsAccepted}
                  onChange={formik.handleChange}
                  color="primary"
                />
              }
              label="I accept the terms and conditions"
            />
            {formik.touched.termsAccepted && formik.errors.termsAccepted && (
              <FormHelperText error>
                {formik.errors.termsAccepted}
              </FormHelperText>
            )}
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default UserInfoForm; 