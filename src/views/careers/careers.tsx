import _ from "lodash";
import React from "react";
import { useEffect } from "react";

// MUI Components
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Card, CardActionArea, CardHeader, CardMedia } from "@mui/material";
import { Box } from "@mui/material";
import { Skeleton } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper";
import { Mousewheel } from "swiper";
import { Navigation } from "swiper";
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// Global Components
import Page from "../../components/page";
import HeroBanner from "../../components/banners/hero-banner";
import CareerFaqs from "../../components/faqs";

import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";
import { apiGetCareersPageContent } from "../../store/careers";
import useConfig from "../../components/useConfig";
import Paragraph from "src/components/display/paragraph/paragraph";
import SnippyTile from "src/components/display/snippy-tile/snippy-tile";
import SpeechBubble, {
  getSpeechBubbleContent,
} from "src/components/display/speech-bubble/speech-bubble";

import NavSwiper, { VMNavTile } from "src/components/menus/nav-swiper/nav-swiper";
import dotFood from "src/assets/images/Icons/dotFood.png";
import dotPeople from "src/assets/images/Icons/dotPeople.png";
import dotHouse from "src/assets/images/Icons/dotHouse.png";
import dotHands from "src/assets/images/Icons/dotHands.png";
import { IJobTile } from "src/components/display/job-tile/job-tile";
import DrawVideoCard from "src/components/display/video-card/video-card";
import DrawJobTile from "src/components/display/job-tile/job-tile";

export default function CareersPage(): React.ReactElement {
  const theme = useTheme();
  const config = useConfig();
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const sampleTiles: VMNavTile[] = [
    {
      id: 1,
      image: dotFood,
      heading: "Hungry?",
      content:
        "No problem. You’ll be entitled to a discounted meal on every shift. Chicken Heroes need their energy, so eat up mate!",
      url: "/company",
    },
    {
      id: 2,
      image: dotPeople,
      heading: "Bag Some BFFs",
      content:
        "We’re a crazy bunch, full of laughs and energy (and the occasional group hug). That’s why people love working here.",
      url: "/company",
    },
    {
      id: 3,
      image: dotHouse,
      heading: "Keeping Things Fresh",
      content:
        "Don’t worry, we won’t stick you on the same shift every day. You’ll get a chance to try a range of different roles on different days to keep things exciting.",
      url: "/company",
    },
    {
      id: 4,
      image: dotHands,
      heading: "Connections",
      content:
        "We’re WA and proud. As a part of the team, you’ll have a chance to connect with the amazing people at our other stores.",
      url: "/company",
    },
  ];

  const jobTiles: IJobTile[] = [
    {
      name: "A",
      role: "Team Member",
      url: "https://craveablebrands.expr3ss.com/jobDetails?selectJob=38&ppt=e22d86d1",
      description:
        "You’ll start stacking up some great new skills by learning how to cook the delicious chicken people come from all over the country for. Whether you’re casual, part-time or full-time, you’ll make loads of great new mates and pick up skills that’ll set you up for life.",
    },
    {
      name: "B",
      role: "Chicken Ninja",
      description: `This is the first chance to really build on your career, and while you won’t be throwing Ninja Stars, you will be leading a team of Chicken Treat legends.
        You’ll help train new members of the Chicken Treat team and ensure our high standards are maintained by those around you. We’ll teach you how to coach and train as well as potentially take control of a busy area of the restaurant on a shift – all under the guidance of a supportive Manager who’ll support you, and help you keep things fun and fresh every step of the way.`,
    },
    {
      name: "C",
      role: "Shift Supervisor",
      url: "https://craveablebrands.expr3ss.com/jobApplication?selectJob=89&ppt=0383efc8",
      description: `In this first step into management, we’ll show you everything you need to know to run shifts by yourself. We’ll show you how to keep your team motivated and excited to be delivering the service we’re known for, and that our delicious chicken is served to the mouth-watering standards our customers have come to expect.`,
    },
    {
      name: "D",
      role: "Management",
      description: `Not only will you now be running shifts to exceptional standards, you’ll start to learn all aspects of running a business. It’s a lot of responsibility, but nothing you won’t be able to handle and we’ll totally be there to support your along the way. You’ll grow from real time learning and Management programs so that you can lead by example and excel in everything that you do.`,
    },
  ];

  // Redux states
  const careersStore = useSelector((state: any) => state.careers);
  const {contentful} = careersStore;

  useEffect(() => {
    if (_.isEmpty(contentful)) {
      if ((contentful === null) && !careersStore.loading) {
        dispatch(apiGetCareersPageContent({config}));
      }

      return;
    }
  }, [config, careersStore, contentful]);

  // const applyNowButton = contentful?.applyNowUrl
  //     ? (
  //         <Button
  //             variant={'contained'}
  //             color={'primary'}
  //             href={contentful?.applyNowUrl}
  //             target={'_blank'}
  //             sx={{mt : 2, p : 2}}
  //         >
  //             {'Apply Now'}
  //         </Button>
  //     )
  //     : undefined
  // ;
  const applyNowButton = (
    <Button
      variant={"contained"}
      color={"primary"}
      href={contentful?.applyNowUrl || ''}
      target={"_blank"}
      disabled={!contentful?.applyNowUrl}
      sx={{ mt: 2, p: 2 }}
    >
      {"Apply Now"}
    </Button>
  );

  return (
    <Page>
      <Grid container spacing={5} sx={{ m: 0 }} flexDirection="column">
        <Grid xs={12} sx={{ p: 0 }}>
          <HeroBanner
            title={contentful?.title || ''}
            imageUrl={contentful?.bannerImageUrl || null}
            sx={{ backgroundColor: contentful?.bannerBackgroundColor || '#000000' }}
            extraContent={applyNowButton}
          />
        </Grid>

        <Grid maxWidth={"lg"} xs={12} sx={{ mx: "auto", p: 0 }}>
          {!_.isEmpty(contentful?.whyWorkHere) && (
            <Paragraph
              sx={{ backgroundColor: "transparent" }}
              headingVariant="h2"
              headerSx={{ fontFamily: "Cera" }}
              contentSx={{
                fontSize: { xs: "20px", lg: "32px" },
                lineHeight: { xs: "24px", lg: "38px" },
                justifyContent: "center",
                textAlign: "center",
              }}
              paragraph={{
                showHeading: true,
                heading: contentful?.whyWorkHere?.title || '',
                docToNode: documentToReactComponents(contentful?.whyWorkHere?.body),
              }}
            />
          )}
        </Grid>
        <Grid maxWidth={"lg"} xs={12} sx={{ mx: "auto", p: 0 }}>
          <Stack
            direction={isDesktop ? "row" : "column"}
            spacing={isDesktop ? 1 : 4}
            justifyContent="center"
          >
            <SnippyTile
              topLine="Born in"
              midLine="1976"
              midLineSx={{ fontSize: "45px !important", lineHeight: "50px !important" }}
              bottomLine="in Western Australia"
            />
            <SnippyTile
              topLine="There are over"
              midLine="50 Chicken Treat"
              bottomLine="stores around WA"
            />
            <SnippyTile
              topLine="Chickens are direct"
              midLine="DESCENDENTS OF DINOSAURS"
              bottomLine="Fact!"
            />
            <SnippyTile
              topLine="Betty's Campaign"
              midLine="#CHICKENTWEET"
              bottomLine="Winner 2016 QSR Media Award for Best Digital Campaign"
            />
          </Stack>
        </Grid>
        <Grid
          maxWidth={"lg"}
          xs={12}
          mt={isDesktop ? 1 : 4}
          sx={{ mx: "auto", p: 0 }}
          display="flex"
          justifyContent="center"
        >
          <SpeechBubble
            tileSx={{
              height: isDesktop ? "310px" : "55vw",
              width: isDesktop ? "500px !important" : "90vw !important",
            }}
            content={getSpeechBubbleContent(
              "Did you know?",
              "A Chicken Treat Ad was one of Heath Ledger's first acting roles",
              !isDesktop ? { fontSize: "20px", lineHeight: "20px" } : {}
            )}
          />
        </Grid>

        <Grid maxWidth={"lg"} xs={12} sx={{ mx: "auto", p: 0 }}>
          <Box sx={{ p: 3, width: "100%" }}>
            <Typography variant={"h2"} align={"center"} sx={{ fontFamily: "Cera" }}>
              {"Job Roles"}
            </Typography>
          </Box>
        </Grid>
        <Grid maxWidth={"lg"} xs={12} sx={{ mx: "auto", p: 0 }}>
          <Grid maxWidth={{ xs: "97vw", sm: "lg" }} xs={12}>
            <Swiper
              spaceBetween={24}
              slidesPerView={isDesktop ? 4 : 1}
              keyboard={{ enabled: true }}
              pagination={{ clickable: true }}
              // mousewheel={true}
              navigation={true}
              modules={[Keyboard, Mousewheel, Navigation, Pagination]}
              style={{ height: "420px" }}
            >
              {jobTiles.map((job, ii) => (
                <SwiperSlide key={`job-title-${ii}`}>
                  <DrawJobTile job={job} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>

        <Grid maxWidth={"lg"} xs={12} sx={{ mx: "auto", p: 0 }}>
          <Box sx={{ p: 3, width: "100%" }}>
            <Typography variant={"h2"} align={"center"} sx={{ fontFamily: "Cera" }}>
              {"Application Process"}
            </Typography>
          </Box>

          <Box sx={{ p: 3, width: "100%" }}>
            {_.isEmpty(contentful?.applicationProcess) ? (
              <Skeleton variant={"rectangular"} width={"100%"} height={"300px"} />
            ) : (
              <Swiper
                spaceBetween={2}
                slidesPerView={isDesktop ? 4 : 1}
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
                // mousewheel={true}
                navigation={true}
                modules={[Keyboard, Mousewheel, Navigation, Pagination]}
              >
                {(contentful?.applicationProcess || []).map((item: any, ii: number) => (
                  <SwiperSlide
                    key={`application-process-${ii}`}
                    style={{
                      height: "auto",
                      paddingBottom: "1em",
                    }}
                  >
                    <Stack
                      spacing={1}
                      sx={{
                        m: 1,
                        height: "100%",
                        backgroundColor: (theme) => theme.palette.common.white,
                        boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Box
                        textAlign={"left"}
                        sx={{
                          p: "1em",
                          height: "50px",
                          backgroundColor: (theme) => theme.palette.common.red,
                        }}
                      >
                        <Typography
                          variant={"h4"}
                          sx={{
                            color: (theme) => theme.palette.common.white,
                            fontSize: { xs: "16px", lg: "20px" },
                            lineHeight: { xs: "19px", lg: "24px" },
                          }}
                        >
                          {/*{`${ii + 1}. ${item.title}`}*/}
                          <span style={{ fontSize: "32px" }}>{`${ii + 1}. `}</span>
                          {`${item.title}`}
                        </Typography>
                      </Box>

                      <Box textAlign={"left"} sx={{ p: "0 1em" }}>
                        <Typography
                          variant={"subtitle1"}
                          sx={{
                            fontSize: { xs: "14px", lg: "16px" },
                            lineHeight: "20px",
                          }}
                        >
                          {documentToReactComponents(item.body)}
                        </Typography>
                      </Box>
                    </Stack>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Box>
        </Grid>

        {/* <Grid maxWidth={"lg"} xs={12} sx={{ mx: "auto", p: 0 }}>
          <Card raised={true}>
            <CardHeader title={"Breege"} />

            <CardActionArea>
              <CardMedia component="video" image={"videos/Breege.mp4"} autoPlay />
            </CardActionArea>
          </Card>
        </Grid> */}

        <Grid maxWidth={"lg"} xs={12} sx={{ mx: "auto", p: 0 }}>
          <Box sx={{ p: 3, width: "100%" }}>
            <Typography variant={"h2"} align={"center"} sx={{ fontFamily: "Cera" }}>
              {"Employee Treats"}
            </Typography>
          </Box>

          {/* <Box sx={{ p: 3, width: "100%" }}>
            {_.isEmpty(contentful?.perks) ? (
              <Skeleton variant={"rectangular"} width={"100%"} height={"300px"} />
            ) : (
              <Swiper
                spaceBetween={2}
                slidesPerView={isDesktop ? 4 : 1}
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
                // mousewheel={true}
                navigation={true}
                modules={[Keyboard, Mousewheel, Navigation, Pagination]}
              >
                {(contentful?.perks || []).map((perk: any, ii: number) => (
                  <SwiperSlide
                    key={`perk-${ii}`}
                    style={{
                      height: "auto",
                      paddingBottom: "1em",
                    }}
                  >
                    <Stack
                      spacing={1}
                      sx={{
                        m: 1,
                        height: "100%",
                        backgroundColor: (theme) => theme.palette.common.white,
                        boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      <Box textAlign={"center"} sx={{ p: "1em 1em 0 1em" }}>
                        <img
                          src={perk.image}
                          style={{ height: isDesktop ? "96px" : "72px" }}
                          alt={"perk-image"}
                        />
                      </Box>

                      <Box textAlign={"left"} sx={{ p: "0 1em" }}>
                        <Typography
                          variant={"h4"}
                          sx={{
                            fontSize: { xs: "16px", lg: "20px" },
                            lineHeight: { xs: "19px", lg: "24px" },
                          }}
                        >
                          {perk.title}
                        </Typography>
                      </Box>

                      <Box textAlign={"left"} sx={{ p: "0 1em" }}>
                        <Typography
                          variant={"subtitle1"}
                          sx={{
                            fontSize: { xs: "14px", lg: "16px" },
                            lineHeight: "20px",
                          }}
                        >
                          {documentToReactComponents(perk.body)}
                        </Typography>
                      </Box>
                    </Stack>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Box> */}
          {/*<Grid*/}
          {/*  maxWidth={"lg"}*/}
          {/*  xs={12}*/}
          {/*  sx={{ mx: "auto", p: 0 }}*/}
          {/*  display="flex"*/}
          {/*  alignItems={"center"}*/}
          {/*>*/}
          {/*  <DrawVideoCard*/}
          {/*    video={{v}}
          {/*    videoURL={`${config.app.PUBLIC_URL}/assets/videos/Breege.mp4`}*/}
          {/*    textContent={`<span style='font-size:24px;font-weight:700;'>Our People</span><br/><span style='font-size:48px;font-family:\"Comic Book\"'>Breege</span><br/><span style='margin-top:48px;font-size:20px;font-family:\"Cera"'>My advice to others considering a role at Chicken Treat is to just GO for it.”</span>`}*/}
          {/*  />*/}
          {/*</Grid>*/}
          <Grid maxWidth={{ xs: "97vw", sm: "lg" }} xs={12}>
            <NavSwiper
              sx={{ backgroundColor: "transparent" }}
              spacing={20}
              tileSx={{ width: "230px !important" }}
              titleSx={{
                textAlign: "center",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "20px !important",
                },
              }}
              contentSx={{
                textAlign: "center",
                fontFamily: "Cera",
                maxHeight: "125px",
                overflow: "hidden",
              }}
              tileItems={sampleTiles}
              //onSelect={focusItem}
            />
          </Grid>
        </Grid>
        <Grid maxWidth={"lg"} xs={12} sx={{ mx: "auto", p: 0 }}>
          {_.isEmpty(contentful?.faqs) ? (
            // Loading Skeleton
            <Skeleton variant={"rectangular"} width={"100%"} height={300} />
          ) : (
            <CareerFaqs items={contentful?.faqs} sx={{ width: "100%" }} />
          )}
        </Grid>

        {/* ALL FAQs Button */}
        <Grid
          maxWidth={"lg"}
          xs={12}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ mx: "auto", mb: 15, p: 2 }}
        >
          <Button variant={"contained"} color={"primary"} href={"/faqs"} sx={{ p: 2 }}>
            {"See all FAQs"}
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
}
