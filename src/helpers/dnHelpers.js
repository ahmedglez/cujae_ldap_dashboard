// Function to extract uid from an LDAP DN
export function extractUidFromDn(dn) {
  const uidMatches = dn.match(/uid=([^,]+)/)
  return uidMatches ? uidMatches[1] : null
}

// Function to extract groups from an LDAP DN
export function extractGroupsFromDn(dn) {
  const groupMatches = dn.match(/ou=([^,]+)/g)
  if (groupMatches) {
    return groupMatches.map(group => group.replace('ou=', ''))
  }
  return []
}

// Function to extract the base from an LDAP DN
export function extractBaseFromDn(dn) {
  const baseMatches = dn.match(/dc=[^,]+/g)
  if (baseMatches) {
    return baseMatches.join(',')
  }
  return ''
}
