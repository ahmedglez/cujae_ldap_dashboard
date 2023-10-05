interface LDAPGroup {
  cn: string
  gidNumber: string
  memberUid?: string
  objectClass: string[]
  objectName: string
  dn: string
}

export default LDAPGroup
