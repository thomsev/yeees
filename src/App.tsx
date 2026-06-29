import { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = {
  hero: '/assets/hero-run.png',
  duo: '/assets/duo-stance.png',
  close: '/assets/close-up-front.png',
  back: '/assets/back-pose.png',
  promo: '/assets/original-promo.jpg',
};

const productCards = [
  {
    title: 'Blackout Tee',
    tag: 'Aero cotton / locked fit',
    image: images.close,
  },
  {
    title: 'Training Short',
    tag: 'Light stretch / dry touch',
    image: images.hero,
  },
  {
    title: 'Studio Crop',
    tag: 'Compression / clean line',
    image: images.duo,
  },
  {
    title: 'Back Mark Tee',
    tag: 'Oversized rear mark',
    image: images.back,
  },
];

const impactWords = ['PUSH', 'LØFT', 'SVETTE', 'FOKUS', 'NULL STØY', 'HARDT LYS', 'YÆÆÆS'];

const proofPoints = [
  ['01', 'Myk og behagelig'],
  ['02', 'Premium kvalitet'],
  ['03', 'Moderne passform'],
  ['04', 'Bærekraftig produksjon'],
];

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const isCompact = window.matchMedia('(max-width: 620px)').matches;

      gsap.set('.hero-word', { yPercent: isCompact ? 0 : 115, rotateX: isCompact ? 0 : -42, opacity: isCompact ? 1 : 0 });
      gsap.set('.hero-kicker, .hero-copy, .hero-cta, .metric', { y: 28, opacity: 0 });
      gsap.set('.hero-image', { scale: 1.15, filter: 'brightness(0.55) contrast(1.2)' });
      gsap.set('.depth-word', { opacity: 0, y: 120, rotate: -8, scale: 0.82 });
      gsap.set('.field-title span', { yPercent: 115, opacity: 0 });
      gsap.set('.pulse-card', { y: 90, opacity: 0, rotate: -4 });
      gsap.set('.hole-brand', { opacity: 0, scale: 0.42, yPercent: 24 });
      gsap.set('.hole-caption', { opacity: 0, y: 48 });
      gsap.set('.scroll-progress-fill', { scaleX: 0 });

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          gsap.set('.scroll-progress-fill', { scaleX: self.progress });
          const label = document.querySelector<HTMLElement>('.hud-label');
          if (!label) return;
          const p = self.progress;
          label.textContent =
            p < 0.16
              ? 'Opening'
              : p < 0.36
                ? 'Intensity'
                : p < 0.55
                  ? 'Fabric'
                  : p < 0.73
                    ? 'Drop'
                    : p < 0.9
                      ? 'Blackout'
                      : 'Finale';
        },
      });

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .to('.hero-image', { scale: 1, filter: 'brightness(0.78) contrast(1.08)', duration: 1.55 })
        .to('.hero-word', { yPercent: 0, rotateX: 0, opacity: 1, stagger: isCompact ? 0 : 0.08, duration: isCompact ? 0.2 : 1.05 }, 0.18)
        .to('.hero-kicker, .hero-copy, .hero-cta', { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 }, 0.62)
        .to('.metric', { y: 0, opacity: 1, stagger: 0.08, duration: 0.75 }, 0.82);

      gsap.to('.hero-image', {
        yPercent: 10,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
            },
          },
        );
      });

      const fieldTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.float-field',
          start: 'top top',
          end: '+=240%',
          pin: true,
          scrub: 1,
        },
      });

      fieldTimeline
        .fromTo('.field-bg-a', { yPercent: -8, scale: 1.18, clipPath: 'inset(8% 66% 8% 6%)' }, { yPercent: 8, scale: 1, clipPath: 'inset(0% 48% 0% 0%)', ease: 'none' }, 0)
        .fromTo('.field-bg-b', { yPercent: 10, scale: 1.08, clipPath: 'inset(22% 4% 22% 68%)' }, { yPercent: -10, scale: 1.18, clipPath: 'inset(8% 0% 6% 54%)', ease: 'none' }, 0)
        .fromTo('.field-bg-c', { xPercent: -18, opacity: 0, scale: 1.2 }, { xPercent: 12, opacity: 0.42, scale: 1.02, ease: 'none' }, 0.15)
        .to('.field-title span', { yPercent: 0, opacity: 1, stagger: 0.08, ease: 'power4.out' }, 0.1)
        .to('.field-title', { scale: 1.08, xPercent: -7, ease: 'none' }, 0.35)
        .to('.field-rule', { scaleX: 1, ease: 'none' }, 0.18)
        .to('.depth-word', { opacity: 1, y: 0, rotate: 0, scale: 1, stagger: 0.08, ease: 'back.out(1.6)' }, 0.22)
        .to('.depth-word', { xPercent: (index) => (index % 2 ? -18 : 22), yPercent: (index) => [-30, 18, -12, 26, -22, 12, -18][index] ?? 0, ease: 'none' }, 0.42)
        .to('.pulse-card', { y: 0, opacity: 1, rotate: 0, stagger: 0.08, ease: 'power3.out' }, 0.32)
        .to('.pulse-card', { y: (index) => (index % 2 ? -70 : 54), x: (index) => (index % 2 ? -34 : 42), ease: 'none' }, 0.55);

      gsap.to('.rail-intro', {
        xPercent: -8,
        opacity: 0.28,
        ease: 'none',
        scrollTrigger: {
          trigger: '.collection-rail',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.collection-rail', {
        backgroundColor: '#000000',
        ease: 'none',
        scrollTrigger: {
          trigger: '.collection-rail',
          start: 'top 35%',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to('.product-tile', {
        y: (index) => (index % 2 ? -44 : 28),
        filter: 'brightness(0.7)',
        ease: 'none',
        scrollTrigger: {
          trigger: '.collection-rail',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      const chaosTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.chaos',
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 1,
        },
      });

      chaosTimeline
        .fromTo('.chaos-image.primary', { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }, { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.08, ease: 'none' })
        .fromTo('.chaos-image.secondary', { clipPath: 'inset(0% 0% 0% 100%)', scale: 1.16 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none' }, 0)
        .fromTo('.chaos-title span', { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.08, ease: 'power4.out' }, 0.1)
        .to('.chaos-title', { xPercent: -18, ease: 'none' }, 0.35)
        .to('.chaos-rule', { scaleX: 1, ease: 'none' }, 0.2)
        .to('.chaos-copy', { y: -80, opacity: 1, ease: 'none' }, 0.3);

      gsap.utils.toArray<HTMLElement>('.texture-image').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.12 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });

      mm.add('(min-width: 900px)', () => {
        const rail = document.querySelector<HTMLElement>('.collection-rail');
        const track = document.querySelector<HTMLElement>('.collection-track');
        if (!rail || !track) return;

        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);

        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: rail,
            start: 'top top',
            end: () => `+=${getDistance() + window.innerHeight}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.to('.final-image', {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.finale',
          start: 'top 72%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      const holeTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.black-hole',
          start: 'top top',
          end: '+=240%',
          pin: true,
          scrub: 1,
        },
      });

      holeTimeline
        .fromTo('.hole-mouth', { scale: 0.16, opacity: 0.2, rotate: 0 }, { scale: 5.8, opacity: 1, rotate: 220, ease: 'power2.inOut' }, 0)
        .fromTo('.hole-ring.one', { scale: 1.5, opacity: 0.8, rotate: 0 }, { scale: 0.28, opacity: 0, rotate: -180, ease: 'none' }, 0)
        .fromTo('.hole-ring.two', { scale: 2.8, opacity: 0.48, rotate: 0 }, { scale: 0.34, opacity: 0, rotate: 180, ease: 'none' }, 0.08)
        .fromTo('.hole-grid', { scale: 1.15, opacity: 0.38 }, { scale: 0.15, opacity: 0, ease: 'power2.in' }, 0)
        .to('.hole-brand', { opacity: 1, scale: 1, yPercent: 0, ease: 'power4.out' }, 0.48)
        .to('.hole-brand', { scale: 1.18, ease: 'none' }, 0.66)
        .to('.hole-caption', { opacity: 1, y: 0, ease: 'power3.out' }, 0.7);

      gsap.to('.final-brand', {
        xPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.finale',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      return () => mm.revert();
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    const hashScroll = window.setTimeout(() => {
      const targetId = window.location.hash.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, left: 0, behavior: 'auto' });
      }
      ScrollTrigger.refresh();
    }, 120);

    window.addEventListener('load', refresh);

    return () => {
      window.clearTimeout(hashScroll);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <Shell ref={rootRef}>
      <ScrollHud aria-hidden="true">
        <HudLabel className="hud-label">Opening</HudLabel>
        <HudTrack>
          <HudFill className="scroll-progress-fill" />
        </HudTrack>
      </ScrollHud>
      <NavBar>
        <Logo>YÆÆÆS</Logo>
        <NavLinks>
          <a href="#drop">Drop</a>
          <a href="#fabric">Fabric</a>
          <a href="#buy">Buy</a>
        </NavLinks>
      </NavBar>

      <Hero className="hero">
        <HeroImage className="hero-image" src={images.hero} alt="YÆÆÆS athlete sprinting in black training kit" />
        <HeroShade />
        <HeroContent>
          <HeroKicker className="hero-kicker">Performance clothing for training days that do not ask nicely.</HeroKicker>
          <HeroTitle aria-label="YÆÆÆS">
            {'YÆÆÆS'.split('').map((letter, index) => (
              <HeroWord className="hero-word" key={`${letter}-${index}`}>
                {letter}
              </HeroWord>
            ))}
          </HeroTitle>
          <HeroCopy className="hero-copy">
            Black training essentials with sharp fits, dry-touch comfort, and the kind of visual weight that belongs
            under concrete, steel, and hard light.
          </HeroCopy>
          <HeroActions className="hero-cta">
            <PrimaryLink href="#drop">Enter the drop</PrimaryLink>
            <SecondaryLink href="#fabric">See the build</SecondaryLink>
          </HeroActions>
        </HeroContent>
        <Metrics>
          <Metric className="metric">
            <strong>240 gsm</strong>
            <span>structured cotton feel</span>
          </Metric>
          <Metric className="metric">
            <strong>4-way</strong>
            <span>training stretch</span>
          </Metric>
          <Metric className="metric">
            <strong>0 flash</strong>
            <span>all black discipline</span>
          </Metric>
        </Metrics>
      </Hero>

      <FloatField className="float-field" id="intensity" aria-hidden="true">
        <FieldImage className="field-bg-a" src={images.close} alt="" />
        <FieldImage className="field-bg-b" src={images.back} alt="" />
        <FieldImage className="field-bg-c" src={images.duo} alt="" />
        <FieldGrid />
        <FieldNoise />
        <FieldTitle className="field-title" aria-label="SVETTE LØFT FOKUS">
          {['SVETTE', 'LØFT', 'FOKUS'].map((word) => (
            <span key={word}>{word}</span>
          ))}
        </FieldTitle>
        <FieldRule className="field-rule" />
        {impactWords.map((word, index) => (
          <DepthWord className="depth-word" $slot={index} key={`${word}-${index}`}>
            {word}
          </DepthWord>
        ))}
        <PulseCard className="pulse-card" $slot={0}>
          <strong>00:47</strong>
          <span>breath goes loud</span>
        </PulseCard>
        <PulseCard className="pulse-card" $slot={1}>
          <strong>184 bpm</strong>
          <span>everything narrows</span>
        </PulseCard>
        <PulseCard className="pulse-card" $slot={2}>
          <strong>null støy</strong>
          <span>only fabric / skin / concrete</span>
        </PulseCard>
      </FloatField>

      <Manifest id="fabric">
        <ManifestText className="reveal">
          <SectionLabel>Fabric intelligence</SectionLabel>
          <h2>Soft where it touches. Brutal where it reads.</h2>
        </ManifestText>
        <ProofGrid>
          {proofPoints.map(([num, text]) => (
            <Proof className="reveal" key={num}>
              <span>{num}</span>
              <strong>{text}</strong>
            </Proof>
          ))}
        </ProofGrid>
      </Manifest>

      <Chaos className="chaos">
        <ChaosImage className="chaos-image primary" src={images.duo} alt="YÆÆÆS athletes in black training wear" />
        <ChaosImage className="chaos-image secondary" src={images.back} alt="YÆÆÆS black back mark tee in gym light" />
        <ChaosShade />
        <ChaosText>
          <ChaosTitle className="chaos-title" aria-label="STILL BLACK STILL LOUD">
            {['STILL', 'BLACK', 'STILL', 'LOUD'].map((word, index) => (
              <span key={`${word}-${index}`}>{word}</span>
            ))}
          </ChaosTitle>
          <ChaosRule className="chaos-rule" />
          <ChaosCopy className="chaos-copy">
            Scroll pins the campaign, rips the image apart, and swaps the mood from concrete daylight to weight-room dark.
          </ChaosCopy>
        </ChaosText>
      </Chaos>

      <CollectionRail className="collection-rail" id="drop">
        <RailIntro className="rail-intro">
          <SectionLabel>Drop 01</SectionLabel>
          <h2 className="reveal">Concrete black essentials.</h2>
        </RailIntro>
        <CollectionTrack className="collection-track">
          {productCards.map((product) => (
            <ProductTile className="reveal product-tile" key={product.title}>
              <ProductImageWrap>
                <ProductImage className="texture-image" src={product.image} alt={product.title} />
              </ProductImageWrap>
              <ProductMeta>
                <h3>{product.title}</h3>
                <p>{product.tag}</p>
              </ProductMeta>
            </ProductTile>
          ))}
        </CollectionTrack>
      </CollectionRail>

      <BlackHole className="black-hole" aria-label="YÆÆÆS transition">
        <HoleGrid className="hole-grid" />
        <HoleRing className="hole-ring one" />
        <HoleRing className="hole-ring two" />
        <HoleMouth className="hole-mouth" />
        <HoleBrand className="hole-brand">YÆÆÆS</HoleBrand>
        <HoleCaption className="hole-caption">the page drops to black before the final frame</HoleCaption>
      </BlackHole>

      <Finale className="finale" id="buy">
        <FinalImage className="final-image" src={images.promo} alt="YÆÆÆS promotional visual with model and benefits" />
        <FinalBrand className="final-brand" aria-hidden="true">YÆÆÆS</FinalBrand>
        <FinalCopy>
          <SectionLabel>Live concept</SectionLabel>
          <h2>YÆÆÆS.NO</h2>
          <p>Launch page ready for product links, sizes, checkout, and campaign traffic.</p>
          <PrimaryLink href="https://yaes.no">Open brand site</PrimaryLink>
        </FinalCopy>
      </Finale>
    </Shell>
  );
}

const Shell = styled.div`
  min-height: 100vh;
  overflow-x: clip;
  background: var(--black);
  color: var(--paper);
`;

const ScrollHud = styled.div`
  position: fixed;
  left: 28px;
  right: 28px;
  bottom: 20px;
  z-index: 30;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: center;
  color: var(--paper);
  mix-blend-mode: difference;
  pointer-events: none;

  @media (max-width: 620px) {
    left: 16px;
    right: 16px;
    bottom: 12px;
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const HudLabel = styled.div`
  min-width: 76px;
  font-size: 0.68rem;
  text-transform: uppercase;
`;

const HudTrack = styled.div`
  height: 1px;
  overflow: hidden;
  background: rgba(241, 240, 234, 0.24);
`;

const HudFill = styled.div`
  width: 100%;
  height: 100%;
  background: var(--paper);
  transform: scaleX(0);
  transform-origin: left;
`;

const NavBar = styled.header`
  position: fixed;
  inset: 0 0 auto;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  color: var(--paper);
  mix-blend-mode: difference;

  @media (max-width: 720px) {
    padding: 16px;
  }
`;

const Logo = styled.a`
  color: inherit;
  font-family: var(--font-display);
  font-size: 1.05rem;
  text-decoration: none;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 20px;
  font-size: 0.75rem;
  text-transform: uppercase;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 620px) {
    gap: 12px;
    font-size: 0.68rem;
  }
`;

const Hero = styled.section`
  position: relative;
  min-height: 88svh;
  overflow: hidden;
  display: grid;
  align-items: end;
  padding: 112px 28px 32px;

  @media (max-width: 720px) {
    min-height: 86svh;
    padding: 88px 16px 20px;
  }
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 118%;
  object-fit: cover;
  object-position: 62% center;
  transform-origin: center;

  @media (max-width: 720px) {
    object-position: 70% center;
  }
`;

const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.6) 34%, rgba(0, 0, 0, 0.1) 70%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.82) 0%, transparent 42%);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1180px;
`;

const HeroKicker = styled.p`
  max-width: 460px;
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.5;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  display: flex;
  flex-wrap: wrap;
  gap: 0.06em;
  perspective: 800px;
  margin: 0;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: 9.8rem;
  line-height: 0.78;
  text-transform: uppercase;

  @media (max-width: 1000px) {
    font-size: 6.8rem;
  }

  @media (max-width: 620px) {
    font-size: 3.45rem;
    gap: 0.04em;
  }
`;

const HeroWord = styled.span`
  display: inline-block;
  transform-origin: center bottom;
`;

const HeroCopy = styled.p`
  max-width: 610px;
  margin: 24px 0 0;
  color: var(--soft);
  font-size: 1.1rem;
  line-height: 1.65;

  @media (max-width: 620px) {
    max-width: 33ch;
    font-size: 0.88rem;
    line-height: 1.48;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
`;

const PrimaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid var(--paper);
  border-radius: 4px;
  background: var(--paper);
  color: var(--black);
  font-weight: 800;
  text-decoration: none;
  text-transform: uppercase;
`;

const SecondaryLink = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 4px;
  color: var(--paper);
  text-decoration: none;
  text-transform: uppercase;
`;

const Metrics = styled.div`
  position: absolute;
  right: 28px;
  bottom: 28px;
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  width: min(560px, calc(100% - 56px));
  border-top: 1px solid rgba(255, 255, 255, 0.24);
  border-left: 1px solid rgba(255, 255, 255, 0.24);

  @media (max-width: 820px) {
    position: relative;
    right: auto;
    bottom: auto;
    margin-top: 46px;
    width: 100%;
  }

  @media (max-width: 540px) {
    display: none;
  }
`;

const Metric = styled.div`
  min-height: 86px;
  padding: 14px;
  border-right: 1px solid rgba(255, 255, 255, 0.24);
  border-bottom: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(12px);

  strong {
    display: block;
    font-family: var(--font-display);
    font-size: 1.3rem;
  }

  span {
    color: var(--muted);
    font-size: 0.82rem;
    text-transform: uppercase;
  }
`;

const FloatField = styled.section`
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  border-top: 8px solid var(--paper);
  border-bottom: 1px solid var(--line);
  background:
    radial-gradient(circle at 58% 48%, rgba(155, 178, 173, 0.18), transparent 32%),
    linear-gradient(180deg, #f1f0ea 0, #f1f0ea 8px, #080808 8px, #121212 44%, #050505 100%),
    var(--black);

  @media (max-width: 720px) {
    min-height: 100svh;
  }
`;

const FieldImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.72) contrast(1.16) saturate(0.8);
  transform-origin: center;
  will-change: transform, clip-path, opacity;

  &.field-bg-c {
    mix-blend-mode: screen;
    opacity: 0;
    filter: grayscale(1) brightness(0.52) contrast(1.5);
  }
`;

const FieldGrid = styled.div`
  position: absolute;
  inset: 8px 0 0;
  background:
    linear-gradient(90deg, rgba(214, 255, 63, 0.18) 1px, transparent 1px),
    linear-gradient(rgba(241, 240, 234, 0.1) 1px, transparent 1px);
  background-size: 12.5vw 18vh;
  opacity: 0.52;
`;

const FieldNoise = styled.div`
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(90deg, transparent 0 68px, rgba(214, 255, 63, 0.08) 68px 70px, transparent 70px 138px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.68), transparent 32%, transparent 68%, rgba(0, 0, 0, 0.58)),
    linear-gradient(0deg, rgba(0, 0, 0, 0.72), transparent 48%, rgba(0, 0, 0, 0.28));
`;

const FieldTitle = styled.h2`
  position: absolute;
  left: 28px;
  bottom: 76px;
  z-index: 4;
  display: grid;
  gap: 2px;
  margin: 0;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: 6.8rem;
  line-height: 0.8;
  text-transform: uppercase;

  span {
    display: block;
    will-change: transform, opacity;
  }

  span:nth-child(2) {
    color: var(--shock);
    text-shadow: 0 0 30px rgba(214, 255, 63, 0.32);
  }

  span:nth-child(3) {
    color: transparent;
    -webkit-text-stroke: 1px var(--paper);
  }

  @media (max-width: 900px) {
    font-size: 5.4rem;
  }

  @media (max-width: 620px) {
    left: 16px;
    bottom: 30px;
    font-size: 3.2rem;
  }
`;

const FieldRule = styled.div`
  position: absolute;
  left: 28px;
  right: 28px;
  top: 20%;
  z-index: 4;
  height: 1px;
  background: var(--paper);
  box-shadow: 0 0 24px rgba(214, 255, 63, 0.34);
  transform: scaleX(0);
  transform-origin: left;

  @media (max-width: 620px) {
    left: 16px;
    right: 16px;
  }
`;

const DepthWord = styled.div<{ $slot: number }>`
  position: absolute;
  left: ${({ $slot }) => [52, 7, 62, 10, 38, 70, 24][$slot] ?? 10}%;
  top: ${({ $slot }) => [13, 24, 32, 48, 58, 70, 79][$slot] ?? 20}%;
  z-index: ${({ $slot }) => ($slot % 2 ? 7 : 3)};
  color: ${({ $slot }) => ($slot === 4 ? 'var(--shock)' : $slot % 3 === 0 ? 'var(--paper)' : 'transparent')};
  -webkit-text-stroke: ${({ $slot }) => ($slot === 4 || $slot % 3 === 0 ? '0' : '1px rgba(241, 240, 234, 0.9)')};
  font-family: var(--font-display);
  font-size: ${({ $slot }) => [4.4, 5.8, 3.4, 6.7, 2.8, 4.1, 7.4][$slot] ?? 4}rem;
  line-height: 0.85;
  text-transform: uppercase;
  white-space: nowrap;
  opacity: 0;
  will-change: transform, opacity;
  filter: drop-shadow(0 18px 34px rgba(0, 0, 0, 0.42));
  mix-blend-mode: ${({ $slot }) => ($slot === 4 ? 'normal' : 'screen')};

  @media (max-width: 720px) {
    left: ${({ $slot }) => [44, 4, 48, 9, 20, 42, 8][$slot] ?? 8}%;
    top: ${({ $slot }) => [12, 22, 34, 47, 60, 69, 78][$slot] ?? 20}%;
    font-size: ${({ $slot }) => [2.1, 2.6, 1.9, 3, 1.55, 2, 3.2][$slot] ?? 2}rem;
  }
`;

const PulseCard = styled.div<{ $slot: number }>`
  position: absolute;
  right: ${({ $slot }) => [6, 28, 8][$slot] ?? 8}%;
  top: ${({ $slot }) => [18, 46, 72][$slot] ?? 20}%;
  z-index: 8;
  width: min(260px, 28vw);
  padding: 18px;
  border: 1px solid ${({ $slot }) => ($slot === 1 ? 'rgba(214, 255, 63, 0.55)' : 'rgba(241, 240, 234, 0.28)')};
  border-radius: 8px;
  background: rgba(5, 5, 5, 0.72);
  backdrop-filter: blur(16px);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.45);
  will-change: transform, opacity;

  strong {
    display: block;
    font-family: var(--font-display);
    font-size: 2rem;
    line-height: 0.9;
    text-transform: uppercase;
  }

  span {
    display: block;
    margin-top: 10px;
    color: var(--muted);
    font-size: 0.78rem;
    line-height: 1.35;
    text-transform: uppercase;
  }

  @media (max-width: 720px) {
    right: ${({ $slot }) => [4, 42, 5][$slot] ?? 4}%;
    top: ${({ $slot }) => [16, 42, 66][$slot] ?? 20}%;
    width: 142px;
    padding: 12px;

    strong {
      font-size: 1.3rem;
    }
  }
`;

const Manifest = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.72fr);
  gap: 48px;
  padding: 110px 28px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent),
    var(--black);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    padding: 74px 16px;
  }
`;

const SectionLabel = styled.span`
  display: block;
  margin-bottom: 16px;
  color: var(--steel);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
`;

const ManifestText = styled.div`
  h2 {
    max-width: 940px;
    margin: 0;
    font-family: var(--font-display);
    font-size: 5.9rem;
    line-height: 0.92;
    text-transform: uppercase;
  }

  @media (max-width: 1000px) {
    h2 {
      font-size: 4.2rem;
    }
  }

  @media (max-width: 620px) {
    h2 {
      font-size: 2.9rem;
    }
  }
`;

const ProofGrid = styled.div`
  display: grid;
  align-content: end;
  border-top: 1px solid var(--line);
`;

const Proof = styled.div`
  display: grid;
  grid-template-columns: 54px 1fr;
  gap: 20px;
  padding: 22px 0;
  border-bottom: 1px solid var(--line);

  span {
    color: var(--steel);
  }

  strong {
    font-size: 1.05rem;
    text-transform: uppercase;
  }
`;

const Chaos = styled.section`
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  background: #050505;
`;

const ChaosImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7) contrast(1.08) saturate(0.92);
  will-change: clip-path, transform;
`;

const ChaosShade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.88), rgba(0, 0, 0, 0.26) 52%, rgba(0, 0, 0, 0.8)),
    linear-gradient(0deg, rgba(0, 0, 0, 0.86), transparent 54%);
`;

const ChaosText = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  align-content: center;
  min-height: 100svh;
  padding: 94px 28px 52px;
`;

const ChaosTitle = styled.h2`
  display: grid;
  gap: 2px;
  width: min(900px, 100%);
  margin: 0;
  overflow: hidden;
  font-family: var(--font-display);
  font-size: 7rem;
  line-height: 0.82;
  text-transform: uppercase;

  span {
    display: block;
    will-change: transform, opacity;
  }

  @media (max-width: 900px) {
    font-size: 5rem;
  }

  @media (max-width: 620px) {
    font-size: 3.3rem;
  }
`;

const ChaosRule = styled.div`
  width: min(620px, 100%);
  height: 1px;
  margin: 30px 0;
  background: var(--paper);
  transform: scaleX(0);
  transform-origin: left;
`;

const ChaosCopy = styled.p`
  max-width: 440px;
  margin: 0;
  color: var(--soft);
  font-size: 1.06rem;
  line-height: 1.6;
  opacity: 0;
`;

const CollectionRail = styled.section`
  min-height: 100vh;
  overflow: hidden;
  padding: 92px 0 72px;
  background:
    linear-gradient(180deg, #101010 0%, #070707 68%, #000 100%),
    #111;
`;

const RailIntro = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.32fr);
  align-items: end;
  gap: 32px;
  padding: 0 28px 38px;

  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: 4rem;
    line-height: 0.95;
    text-transform: uppercase;
  }

  &::after {
    content: 'Scroll the drop';
    justify-self: end;
    padding-bottom: 8px;
    color: var(--muted);
    font-size: 0.78rem;
    text-transform: uppercase;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    padding-inline: 16px;

    h2 {
      font-size: 2.8rem;
    }

    &::after {
      justify-self: start;
    }
  }
`;

const CollectionTrack = styled.div`
  display: flex;
  gap: 18px;
  width: max-content;
  padding: 0 28px;

  @media (max-width: 899px) {
    width: auto;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 0 16px 12px;
  }
`;

const ProductTile = styled.article`
  width: 440px;
  flex: 0 0 440px;
  scroll-snap-align: start;
  background:
    linear-gradient(180deg, rgba(241, 240, 234, 0.04), transparent 38%),
    #080808;
  border: 1px solid rgba(241, 240, 234, 0.2);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.38);
  will-change: transform, filter;

  @media (max-width: 620px) {
    width: 82vw;
    flex-basis: 82vw;
  }
`;

const ProductImageWrap = styled.div`
  height: 620px;
  overflow: hidden;
  background: #050505;
  border-bottom: 1px solid rgba(241, 240, 234, 0.12);

  @media (max-width: 620px) {
    height: 470px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.86) contrast(1.08);
`;

const ProductMeta = styled.div`
  display: flex;
  min-height: 122px;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  padding: 18px;

  h3,
  p {
    margin: 0;
  }

  h3 {
    max-width: 12ch;
    font-family: var(--font-display);
    font-size: 1.8rem;
    line-height: 0.95;
    text-transform: uppercase;
  }

  p {
    max-width: 18ch;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.35;
    text-align: right;
    text-transform: uppercase;
  }
`;

const BlackHole = styled.section`
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  display: grid;
  place-items: center;
  isolation: isolate;
  background: #000;
  color: var(--paper);
`;

const HoleGrid = styled.div`
  position: absolute;
  inset: -20%;
  background:
    linear-gradient(90deg, rgba(241, 240, 234, 0.12) 1px, transparent 1px),
    linear-gradient(rgba(214, 255, 63, 0.1) 1px, transparent 1px);
  background-size: 9vw 9vw;
  transform-origin: center;
`;

const HoleRing = styled.div`
  position: absolute;
  width: min(72vw, 720px);
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid rgba(241, 240, 234, 0.4);
  box-shadow:
    inset 0 0 80px rgba(214, 255, 63, 0.12),
    0 0 90px rgba(214, 255, 63, 0.16);
  transform-origin: center;

  &.two {
    width: min(92vw, 980px);
    border-color: rgba(214, 255, 63, 0.28);
    border-style: dashed;
  }
`;

const HoleMouth = styled.div`
  position: absolute;
  width: min(42vw, 460px);
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle, #000 0 38%, rgba(0, 0, 0, 0.94) 45%, rgba(214, 255, 63, 0.16) 52%, rgba(241, 240, 234, 0.18) 58%, transparent 68%),
    conic-gradient(from 90deg, transparent, rgba(214, 255, 63, 0.34), transparent, rgba(241, 240, 234, 0.24), transparent);
  filter: blur(0.2px);
  box-shadow:
    0 0 120px rgba(0, 0, 0, 1),
    0 0 100px rgba(214, 255, 63, 0.16);
`;

const HoleBrand = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(4rem, 19vw, 19rem);
  line-height: 0.78;
  text-transform: uppercase;
  color: var(--paper);
  text-shadow:
    0 0 38px rgba(241, 240, 234, 0.16),
    0 0 80px rgba(214, 255, 63, 0.14);
  pointer-events: none;
`;

const HoleCaption = styled.p`
  position: absolute;
  left: 28px;
  bottom: 28px;
  z-index: 4;
  max-width: 320px;
  margin: 0;
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.45;
  text-transform: uppercase;

  @media (max-width: 620px) {
    left: 16px;
    right: 16px;
    bottom: 18px;
  }
`;

const Finale = styled.section`
  position: relative;
  min-height: 96vh;
  display: grid;
  align-items: end;
  overflow: hidden;
  padding: 96px 28px 44px;
  background: #050505;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background:
      linear-gradient(90deg, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.86) 28%, rgba(0, 0, 0, 0.24) 58%, transparent 100%),
      linear-gradient(0deg, rgba(0, 0, 0, 0.8), transparent 46%);
    pointer-events: none;
  }

  @media (max-width: 720px) {
    min-height: 86vh;
    padding: 82px 16px 28px;

    &::before {
      background:
        linear-gradient(0deg, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.62) 48%, rgba(0, 0, 0, 0.2) 100%),
        linear-gradient(90deg, rgba(0, 0, 0, 0.8), transparent 72%);
    }
  }
`;

const FinalImage = styled.img`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.12);
  clip-path: inset(12% 10% 12% 10%);
  filter: brightness(0.72) contrast(1.08);
`;

const FinalBrand = styled.div`
  position: absolute;
  left: 24px;
  right: auto;
  bottom: 30px;
  z-index: 2;
  color: rgba(241, 240, 234, 0.15);
  font-family: var(--font-display);
  font-size: 14rem;
  line-height: 0.78;
  white-space: nowrap;
  pointer-events: none;

  @media (max-width: 900px) {
    font-size: 8rem;
  }

  @media (max-width: 620px) {
    left: 12px;
    bottom: 26px;
    font-size: 4.6rem;
  }
`;

const FinalCopy = styled.div`
  position: relative;
  z-index: 3;
  width: min(680px, 100%);

  h2 {
    margin: 0;
    font-family: var(--font-display);
    font-size: 5.4rem;
    line-height: 0.88;
  }

  p {
    max-width: 430px;
    margin: 20px 0 26px;
    color: var(--soft);
    line-height: 1.6;
  }

  @media (max-width: 620px) {
    h2 {
      font-size: 3.1rem;
    }
  }
`;
