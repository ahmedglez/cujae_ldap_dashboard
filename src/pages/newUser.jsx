import React, { useState } from 'react'
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import Joi from 'joi'

const ldapEntrySchema = Joi.object({
  CI: Joi.string().required(),
  middleName: Joi.string().required(),
  lastName: Joi.string().required(),
  name: Joi.string().required(),
  homeAddress: Joi.string().required(),
  telephoneNumber: Joi.string().required(),
  dayRegister: Joi.date().iso().required(),
  sex: Joi.string().valid('M', 'F').required(),
  area: Joi.string().allow(null).required(),
  userCondition: Joi.string().required(),
  userStatus: Joi.string().required(),
  sedeMunicipio: Joi.string().required(),
  userType: Joi.string().required(),
  userInformation: Joi.string().required(),
  career: Joi.string().required(),
  studentClassGroup: Joi.string().required(),
  studentYear: Joi.string().required(),
  country: Joi.string().required(),
  UJC: Joi.string().required(),
  skinColor: Joi.string().required(),
  nameInstitution: Joi.string().required(),
  right: Joi.string().required(),
  hash: Joi.string().required(),
  lastTimeChange: Joi.string().required(),
  uid: Joi.string().required(),
  homeDirectory: Joi.string().required(),
  givenName: Joi.string().required(),
  cn: Joi.string().required(),
  sn: Joi.string().required(),
  displayName: Joi.string().required(),
  uidNumber: Joi.string().required(),
  userPassword: Joi.string().required(),
  mail: Joi.array().items(Joi.string()).required(),
  maildrop: Joi.array().items(Joi.string()).required(),
  gidNumber: Joi.string().required(),
  sambaSID: Joi.string().required(),
  objectClass: Joi.array().items(Joi.string()).required()
})

const NewUserForm = () => {
  const [user, setUser] = useState({
    CI: '',
    middleName: '',
    lastName: '',
    name: '',
    homeAddress: '',
    telephoneNumber: '',
    dayRegister: new Date().toISOString().split('T')[0],
    sex: 'M',
    area: '',
    userCondition: '',
    userStatus: '',
    sedeMunicipio: '',
    userType: '',
    userInformation: '',
    career: '',
    studentClassGroup: '',
    studentYear: '',
    country: '',
    UJC: '',
    skinColor: '',
    nameInstitution: '',
    right: '',
    hash: '',
    lastTimeChange: '',
    uid: '',
    homeDirectory: '',
    givenName: '',
    cn: '',
    sn: '',
    displayName: '',
    uidNumber: '',
    userPassword: '',
    mail: [''],
    maildrop: [''],
    gidNumber: '',
    sambaSID: '',
    objectClass: ['']
  })

  const [errors, setErrors] = useState({})

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleMailChange = (e, index) => {
    const newMail = [...user.mail]
    newMail[index] = e.target.value
    setUser({ ...user, mail: newMail })
  }

  const handleMaildropChange = (e, index) => {
    const newMaildrop = [...user.maildrop]
    newMaildrop[index] = e.target.value
    setUser({ ...user, maildrop: newMaildrop })
  }

  const addMailField = () => {
    setUser({ ...user, mail: [...user.mail, ''] })
  }

  const removeMailField = index => {
    const newMail = [...user.mail]
    newMail.splice(index, 1)
    setUser({ ...user, mail: newMail })
  }

  const addMaildropField = () => {
    setUser({ ...user, maildrop: [...user.maildrop, ''] })
  }

  const removeMaildropField = index => {
    const newMaildrop = [...user.maildrop]
    newMaildrop.splice(index, 1)
    setUser({ ...user, maildrop: newMaildrop })
  }

  const handleSubmit = () => {
    const { error } = ldapEntrySchema.validate(user, { abortEarly: false })

    if (error) {
      const newErrors = {}
      error.details.forEach(detail => {
        newErrors[detail.path[0]] = detail.message
      })
      setErrors(newErrors)
    } else {
      // Handle form submission (e.g., send the data to the server)
      console.log('User data:', user)
      setErrors({})
    }
  }

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='CI'
            name='CI'
            value={user.CI}
            onChange={handleChange}
            error={!!errors.CI}
            helperText={errors.CI}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Middle Name'
            name='middleName'
            value={user.middleName}
            onChange={handleChange}
            error={!!errors.middleName}
            helperText={errors.middleName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Last Name'
            name='lastName'
            value={user.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Name'
            name='name'
            value={user.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Home Address'
            name='homeAddress'
            value={user.homeAddress}
            onChange={handleChange}
            error={!!errors.homeAddress}
            helperText={errors.homeAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Telephone Number'
            name='telephoneNumber'
            value={user.telephoneNumber}
            onChange={handleChange}
            error={!!errors.telephoneNumber}
            helperText={errors.telephoneNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Day Register'
            name='dayRegister'
            type='date'
            value={user.dayRegister}
            onChange={handleChange}
            error={!!errors.dayRegister}
            helperText={errors.dayRegister}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Sex</InputLabel>
            <Select name='sex' value={user.sex} onChange={handleChange} error={!!errors.sex}>
              <MenuItem value='M'>Male</MenuItem>
              <MenuItem value='F'>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Area'
            name='area'
            value={user.area}
            onChange={handleChange}
            error={!!errors.area}
            helperText={errors.area}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='User Condition'
            name='userCondition'
            value={user.userCondition}
            onChange={handleChange}
            error={!!errors.userCondition}
            helperText={errors.userCondition}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='User Status'
            name='userStatus'
            value={user.userStatus}
            onChange={handleChange}
            error={!!errors.userStatus}
            helperText={errors.userStatus}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Sede Municipio'
            name='sedeMunicipio'
            value={user.sedeMunicipio}
            onChange={handleChange}
            error={!!errors.sedeMunicipio}
            helperText={errors.sedeMunicipio}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='User Type'
            name='userType'
            value={user.userType}
            onChange={handleChange}
            error={!!errors.userType}
            helperText={errors.userType}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='User Information'
            name='userInformation'
            value={user.userInformation}
            onChange={handleChange}
            error={!!errors.userInformation}
            helperText={errors.userInformation}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Career'
            name='career'
            value={user.career}
            onChange={handleChange}
            error={!!errors.career}
            helperText={errors.career}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Student Class Group'
            name='studentClassGroup'
            value={user.studentClassGroup}
            onChange={handleChange}
            error={!!errors.studentClassGroup}
            helperText={errors.studentClassGroup}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Student Year'
            name='studentYear'
            value={user.studentYear}
            onChange={handleChange}
            error={!!errors.studentYear}
            helperText={errors.studentYear}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Country'
            name='country'
            value={user.country}
            onChange={handleChange}
            error={!!errors.country}
            helperText={errors.country}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='UJC'
            name='UJC'
            value={user.UJC}
            onChange={handleChange}
            error={!!errors.UJC}
            helperText={errors.UJC}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Skin Color'
            name='skinColor'
            value={user.skinColor}
            onChange={handleChange}
            error={!!errors.skinColor}
            helperText={errors.skinColor}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Name Institution'
            name='nameInstitution'
            value={user.nameInstitution}
            onChange={handleChange}
            error={!!errors.nameInstitution}
            helperText={errors.nameInstitution}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Right'
            name='right'
            value={user.right}
            onChange={handleChange}
            error={!!errors.right}
            helperText={errors.right}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Hash'
            name='hash'
            value={user.hash}
            onChange={handleChange}
            error={!!errors.hash}
            helperText={errors.hash}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Last Time Change'
            name='lastTimeChange'
            value={user.lastTimeChange}
            onChange={handleChange}
            error={!!errors.lastTimeChange}
            helperText={errors.lastTimeChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='UID'
            name='uid'
            value={user.uid}
            onChange={handleChange}
            error={!!errors.uid}
            helperText={errors.uid}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Home Directory'
            name='homeDirectory'
            value={user.homeDirectory}
            onChange={handleChange}
            error={!!errors.homeDirectory}
            helperText={errors.homeDirectory}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Given Name'
            name='givenName'
            value={user.givenName}
            onChange={handleChange}
            error={!!errors.givenName}
            helperText={errors.givenName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='CN'
            name='cn'
            value={user.cn}
            onChange={handleChange}
            error={!!errors.cn}
            helperText={errors.cn}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='SN'
            name='sn'
            value={user.sn}
            onChange={handleChange}
            error={!!errors.sn}
            helperText={errors.sn}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Display Name'
            name='displayName'
            value={user.displayName}
            onChange={handleChange}
            error={!!errors.displayName}
            helperText={errors.displayName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='UID Number'
            name='uidNumber'
            value={user.uidNumber}
            onChange={handleChange}
            error={!!errors.uidNumber}
            helperText={errors.uidNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='User Password'
            name='userPassword'
            value={user.userPassword}
            onChange={handleChange}
            error={!!errors.userPassword}
            helperText={errors.userPassword}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='GID Number'
            name='gidNumber'
            value={user.gidNumber}
            onChange={handleChange}
            error={!!errors.gidNumber}
            helperText={errors.gidNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Samba SID'
            name='sambaSID'
            value={user.sambaSID}
            onChange={handleChange}
            error={!!errors.sambaSID}
            helperText={errors.sambaSID}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Object Class</InputLabel>
            <Select name='objectClass' value={user.objectClass[0]} onChange={handleChange} error={!!errors.objectClass}>
              <MenuItem value='objectClass1'>Object Class 1</MenuItem>
              <MenuItem value='objectClass2'>Object Class 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Mail</InputLabel>
            {user.mail.map((mail, index) => (
              <div key={index}>
                <TextField
                  fullWidth
                  name={`mail[${index}]`}
                  value={mail}
                  onChange={e => handleMailChange(e, index)}
                  error={!!errors.mail}
                  helperText={errors.mail}
                />
                <Button variant='contained' color='secondary' onClick={() => removeMailField(index)}>
                  Remove Mail
                </Button>
              </div>
            ))}
            <Button variant='contained' color='primary' onClick={addMailField}>
              Add Mail
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Maildrop</InputLabel>
            {user.maildrop.map((maildrop, index) => (
              <div key={index}>
                <TextField
                  fullWidth
                  name={`maildrop[${index}]`}
                  value={maildrop}
                  onChange={e => handleMaildropChange(e, index)}
                  error={!!errors.maildrop}
                  helperText={errors.maildrop}
                />
                <Button variant='contained' color='secondary' onClick={() => removeMaildropField(index)}>
                  Remove Maildrop
                </Button>
              </div>
            ))}
            <Button variant='contained' color='primary' onClick={addMaildropField}>
              Add Maildrop
            </Button>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Create User
      </Button>
    </form>
  )
}

export default NewUserForm
