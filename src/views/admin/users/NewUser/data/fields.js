const objectClasses = [
  'top',
  'person',
  'posixAccount',
  'shadowAccount',
  'inetOrgPerson',
  'iesServices',
  'sambaSamAccount',
  'radiusprofile',
  'CourierMailAlias',
  'iesMember'
]

export const initialState = {
  CI: '',
  middleName: '',
  lastName: '',
  name: '',
  homeAddress: '',
  telephoneNumber: '',
  sex: 'M',
  area: 'INGENIERIA INFORMATICA',
  sedeMunicipio: '',
  userType: 'Estudiante',
  country: 'Cuba',
  UJC: 'No',
  skinColor: 'Blanco',
  nameInstitution: 'null',
  userStatus: 'Activo',
  uid: '',
  givenName: '',
  cn: '',
  sn: '',
  displayName: '',
  userPassword: '',
  mail: [''],
  maildrop: [''],
  objectClass: objectClasses
}
