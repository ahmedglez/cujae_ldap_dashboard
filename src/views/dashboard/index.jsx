// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import Poll from 'mdi-material-ui/Poll'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Components Imports
import ContactMuralCard from '@/views/dashboard/ContactMuralCard'
import WelcomeCard from '@/views/dashboard/WelcomeCard'

// ** Demo Components Imports
import CustomCard from '@/views/dashboard/CustomCard'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import Table from 'src/views/dashboard/Table'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'

// ** Hooks
import useAvatarSelector from '@/hooks/useAvatarSelector'

// ** Assets
import logo from 'public/images/favicon.png'

// ** Stores
import useProfileStore from '@/stores/profile.store'

// ** Others
import principalContacts from '@/data/contacts'

const Dashboard = () => {
  useAvatarSelector()
  const profile = useProfileStore()
  console.log(profile)

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WelcomeCard />
        </Grid>
        <Grid item xs={12}>
          {<StatisticsCard />}
        </Grid>
        {profile.isAdmin && (
          <Grid item xs={12}>
            <WeeklyOverview />
          </Grid>
        )}
        <Grid item xs={12} md={4}>
          <CustomCard
            title={`SIGENU`}
            description={` Accede a SIGENU para visualizar información académica y calificaciones de estudiantes de forma rápida y
          sencilla.`}
            link={`https://sigenu.cujae.edu.cu/josso/signon/login.do?josso_back_to=https://sigenu.cujae.edu.cu/sigenu-dss/josso_security_check&josso_partnerapp_id=sigenudss-partner`}
            cta={`Accede a SIGENU`}
            image={logo}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ContactMuralCard contacts={principalContacts} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
