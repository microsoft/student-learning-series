---
title: What I Learned from My Campus Recycling Dashboard Project
date: 2026-07-17
summary: I used campus hauling data and visual bin checks to build a recycling dashboard, and this is what I learned about cleanup, interpretation limits, and practical next-step recommendations.
---

In spring 2025, I built a campus recycling dashboard for a Data Analytics course project because I wanted to understand where campus waste was going and where recycling was getting stuck. I used Excel because I already knew the spreadsheet basics and wanted to get better with charts. My final dashboard included filters for year and building, and that changed the kinds of questions I could ask.

I started with monthly facilities hauling reports from January 2023 through December 2024 across 12 campus buildings. The dataset was supposed to have 288 rows (24 months x 12 buildings), but I found 289 before cleanup because one March 2024 row was duplicated. I also ran 8 visual recycling-bin checks in March and April 2025, where I estimated the share of items that did not belong in recycling.

## What I cleaned and why it mattered

I documented four cleanup decisions:

1. Standardized building names ("Student Ctr" to "Student Center").
2. Removed one duplicate March 2024 row after checking the original facilities report.
3. Kept 6 blank compost cells as missing values instead of changing them to zero.
4. Added a dashboard note so those missing values were visible.

Keeping those blanks mattered because zero means "none collected," while blank can mean "not recorded." If I forced missing values to zero, the compost trend would look more certain than the source data supports.

## The year-over-year pattern I saw

For 2023, the recorded totals were 196.1 tons total waste: 128.4 landfill, 46.2 recycling, and 21.5 compost, for a 34.5% recorded diversion rate.

For 2024, the recorded totals were 199.3 tons total waste: 119.8 landfill, 51.6 recycling, and 27.9 compost, for a 39.9% recorded diversion rate.

All of these are recorded weights in tons, and diversion is a recorded diversion rate based on available records.

The overall waste total was almost flat (+1.6%), but landfill dropped by 8.6 tons (about 6.7%), recycling increased by 5.4 tons (about 11.7%), and compost increased by 6.4 tons (about 29.8%). The recorded diversion rate improved by 5.4 percentage points. That looked encouraging, with the important limitation that 6 missing compost values still affect how confidently I can compare years.

## Why month and building views changed the story

The annual totals looked positive, but they hid important variation. May 2024 landfill was 12.2 tons, which was 18% above the average monthly landfill total across all 24 months. Move-out timing seems relevant, but hauling data alone does not tell me what caused that spike.

My contamination checks also showed differences by building. Across 8 visual checks (n=8), the average estimated contamination was 22%. Student Center was 31% (n=8), North Hall was 27% (n=8), and Library was 12% (n=8). The most common wrong items I marked were food containers and plastic bags. These checks were a small visual sample, not a full waste audit, so I treated them as directional, not definitive.

During a May 2025 move-out site walk, I also noticed temporary landfill bins near North Hall exits while recycling bins were farther away. That observation helped me connect the dashboard patterns to a practical setup question.

One dashboard reading tip I would share: check the monthly line chart before you trust annual totals. The year totals looked better overall, but the line view made the May 2024 landfill spike visible immediately.

## Recommendations I made (and what I cannot claim)

I also kept these limits in view while interpreting results: 6 compost values were missing, the contamination checks were a small visual sample, hauling records cannot show what caused spikes, and tonnage is not the same as behavior, cost, or emissions.

Based on the data and observations, I recommended:

1. Testing standardized picture-based recycling labels at Student Center and North Hall, because those had the highest contamination estimates.
2. Pairing recycling and landfill bins at the same stations, because I found high-traffic spots where bins were separated.
3. Testing revised bin placement during May move-out, because of the May landfill spike and the North Hall site-walk setup.

The campus sustainability office later piloted all three recommendations, and I do not have pilot results. Because of that, I cannot claim these pilots reduced waste or improved recycling.

## What this project changed for me

One thing I kept learning is that "tons collected" and "better sorting behavior" are not the same claim. More recycling tonnage does not automatically mean every item in those loads was recyclable.

This project also reminded me that a chart should make the question easier to see, not make the answer look more certain than the data allows. The building filter was especially useful because it turned a broad question ("How is campus doing?") into specific next steps ("Why are Student Center and North Hall different, and what should we test first?").
