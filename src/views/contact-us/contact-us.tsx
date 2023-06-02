import React from 'react';

// MUI Components
import Grid       from '@mui/material/Unstable_Grid2';
import {useTheme} from '@mui/material/styles';

// Global Components
import Page       from '../../components/page';
import HeroBanner from '../../components/banners/hero-banner';

// Local Static Assets
import heroImage from '../../assets/images/figma/backgrounds/wall-art.png';

// Local Components
import DrawContactTile  from './components/contact-tile';
import {Box}            from '@mui/material';
import {Container}      from '@mui/material';
import {Paper}          from '@mui/material';
import {Stack}          from '@mui/material';
import {Typography}     from '@mui/material';
import {useMediaQuery}  from '@mui/material';
import contactBanner    from 'src/assets/images/figma/backgrounds/contactBanner.png';
import franchiseBanner  from 'src/assets/images/figma/backgrounds/franchising.jpg';
import feedbackBanner   from 'src/assets/images/figma/backgrounds/feedback.jpg';
import paletteColors    from 'src/theme/paletteColors';
import StandaloneButton from 'src/components/buttons/standalone-button';
import theme            from 'src/theme';

import {jumpTo} from '../content/drawSection';

export default function ContactUsPage(): React.ReactElement {
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up("sm"));

  const styles = {
    container1: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
  };
  return (
    <Page>
      <Grid container>
        <Grid xs={12}>
          <HeroBanner
            // TODO: manage via contentful
            //title={contentful.title}
            //imageUrl={contentful.bannerImageUrl}
            //sx={{backgroundColor : contentful.bannerBackgroundColor}}
            title="Contact Us"
            imageUrl={heroImage}
          />
        </Grid>
        <Grid xs={12} style={{ maxWidth: "100vw" }}>
          <Container sx={{ ...styles.container1 }}>
            <Grid maxWidth="lg" mt={3}>
              <Stack
                width="100%"
                direction={smAndUp ? "row" : "column"}
                spacing={smAndUp ? 2 : 4}
                justifyContent="space-evenly"
                alignItems={"center"}
              >
                <DrawContactTile
                  topImage={feedbackBanner}
                  heading="Customer Feedback"
                  content="If you want to tell us something we want to hear it!"
                  callToAction={[
                    { buttonText: "Send Feedback", linkUrl: "mailto:enquiries@oporto.com.au" },
                  ]}
                  sx={{ width: "340px", height: "384px" }}
                />
                <DrawContactTile
                  topImage={franchiseBanner}
                  heading="Franchise Enquiry"
                  content="Interested in becoming an Oporto franchisee?"
                  callToAction={[
                    {
                      buttonText: "Oporto",
                      linkUrl: "mailto:franchise@oporto.com.au",
                      sx: { lineHeight: "16px !important" },
                    },
                    {
                      buttonText: "Craveable",
                      buttonColor: "#21B0CC",
                      linkUrl: "mailto:franchise@oporto.com.au",
                    },
                  ]}
                  sx={{ width: "340px", height: "384px" }}
                />
                <DrawContactTile
                  topImage={contactBanner}
                  heading="Message Us"
                  content="Want to let us know about an experience separate to your order?"
                  callToAction={[
                    { buttonText: "Message Us", linkUrl: "mailto:info@oporto.com.au" },
                  ]}
                  sx={{ width: "340px", height: "384px" }}
                />
              </Stack>
            </Grid>
            <Grid maxWidth="lg" mt={4} display="flex" justifyContent="center">
              <Typography variant="h3" width={"100%"} textAlign={"center"}>
                Got a Question?
              </Typography>
            </Grid>
            <Grid maxWidth="lg" mt={4} display="flex" justifyContent="center">
              <Grid container justifyContent={"center"} spacing={4}>
                <Grid>
                  <JumpBlock heading="General" url={"/faqs"} />
                </Grid>
                <Grid>
                  <JumpBlock heading="Products" url={"/faqs"} />
                </Grid>
                <Grid>
                  <JumpBlock heading="Orders" url={"/faqs"} />
                </Grid>
                <Grid>
                  <JumpBlock heading="The Flock" url={"/faqs"} />
                </Grid>
                <Grid>
                  <JumpBlock heading="Careers" url={"/faqs"} />
                </Grid>
              </Grid>
            </Grid>
            <Grid maxWidth="lg" mt={4} display="flex" justifyContent="center">
              <StandaloneButton
                buttonText="See all FAQs"
                buttonClick={() => (window.location.href = "/faqs")}
              />
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Page>
  );
}

const JumpBlock = (props: { heading: string; url: string }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: paletteColors.grey,
        color: paletteColors.white,
        fontSize: "48px",
        fontFamily: theme.typography.fontFamily,
        fontWeight: 700,
        width: "340px",
        height: "192px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        cursor: "pointer",
      }}
    >
      <Box
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        display="flex"
        onClick={() => jumpTo(props.url)}
      >
        {props.heading}
      </Box>
    </Paper>
  );
};
