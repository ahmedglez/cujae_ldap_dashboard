// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Components Imports
import WelcomeCard from '@/containers/Dashboard/components/WelcomeCard'
import ContactMuralCard from '@/views/dashboard/ContactMuralCard'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import CustomCard from '@/views/dashboard/CustomCard'

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
  const { isAdmin } = useProfileStore()

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WelcomeCard />
        </Grid>
        <Grid item xs={12}>
          <StatisticsCard />
        </Grid>
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
        {isAdmin && (
          <Grid item xs={12} md={8}>
            <WeeklyOverview />
          </Grid>
        )}
        {!isAdmin && (
          <Grid item xs={12} md={4}>
            <ContactMuralCard contacts={principalContacts} />
          </Grid>
        )}

        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
