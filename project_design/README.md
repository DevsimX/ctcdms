# Clinical Test Center Data Management System — Project Report

Detailed technical report covering database design, backend API views, frontend pages, and components. Geography is adapted for Australia: states and territories (e.g. NSW, VIC, QLD), regions such as Sydney and South East Queensland, and regional/state-level aggregates.

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | Next.js 15.5.9, Tailwind CSS, MUI (Material-UI) for charts and components, Leaflet for interactive map |
| **Backend** | Django, PostgreSQL, Docker, Nginx |
| **CI/CD** | GitHub Actions (GitHub CI/CD) |

---

## 1. Backend Overview

- **Framework:** Django latest with Django REST Framework (DRF)
- **Auth:** JWT (`rest_framework_jwt`), custom `TokenAuth` on most endpoints

---

## 2. Database Design

All models use `managed = False` and map to existing tables.

### 2.1 Core entities

| Model | DB Table | Description |
|-------|----------|-------------|
| **Hospital** | `hospital` | Hospital/office info: `hospital_id`, `office_id`, `hospitalOfficeId` (PK), `level`, `region`, `area_fullname`, addresses, `lat_out`/`lng_out`, `item_num` |
| **Item** | `item` | 559 test items: `id`, `domain`, `name`, `initial` |
| **ItemTea** | `item_tea` | TEA (allowable error) per item: `item` (PK), `tea` |

### 2.2 Indoor data

| Model | DB Table | Description |
|-------|----------|-------------|
| **BackApiIndoor19** | `backApi_indoor_19` | Raw indoor 2019 data: `hospitalOfficeId`, `time`, `item`, `sample_id`, `data`, `instrument`, `reagent`, `method`, `group` |
| **IndoorResult** | `indoor_result` | Indoor CV: `item`, `hos_level`, `hos_id`, `hos_name`, `sample_id`, `year`, `cv`, `data_num`, `group_avg`, `group_sigma`, `target` |
| **IndoorResultWithGroup** | `indoor_result_with_group` | Indoor CV/sigma by instrument group: `item`, `sample_id`, `group`, `hos_id`, `office_id`, `hos_level`, `year`, `cv`, `sigma`, `count` |
| **GroupIndoorResult19** | `group_indoor_result_19` | 2019 indoor stats by item/sample/group: `cv`, `sigma` |
| **LevelIndoorResult19** | `level_indoor_result_19` | 2019 indoor stats by item/sample/hospital level: `cv`, `sigma` |
| **ItemLabNumIndoor** | `item_lab_num_indoor` | Yearly indoor item count and lab count |

### 2.3 Outdoor data

| Model | DB Table | Description |
|-------|----------|-------------|
| **Outdoor** | `outdoor` | Outdoor EQA: `pro_code`, `hos_code`, `dep_code`, `sample_no`, `test_values`, `group_*`, `x`, `sd`, `instrument`, `reagent`, `method`, `qualified`, `time` |
| **OutdoorOffsetCurve** | `outdoor_offset_curve` | Offset curves: `item`, `hospital_id`, `fitted_curve`, `fitted_curve_slope`/`_intercept`, `detection_value`, `offset_value` |
| **OutdoorPassPercent** | (no table in models) | Pass rate (single `pass_percent` field) |
| **ItemLabNumOutdoor** | `item_lab_num_outdoor` | Yearly outdoor item count and lab count |

### 2.4 Scores and examination

| Model | DB Table | Description |
|-------|----------|-------------|
| **ExamineResult** | `examine_result` | Inspection scores: `quality_control_id`, `hospital`, `rank`, `office`, `score`, `year` |
| **HospitalScore** | `hospital_score` | Aggregated scores: `hospital_id` (PK), `hospital_name`, `total_score`, `examine_score`, `indoor_score`, `outdoor_score`, `level`, `region_code` |

### 2.5 Project CV and area

| Model | DB Table | Description |
|-------|----------|-------------|
| **ProjectMonthCv** | `project_month_cv` | Project-level monthly CV: `project`, `sample_number`, `year`, `month`, `average`, `standard_deviation`, `cv` |
| **ProjectHospitalMonthCv** | `project_hospital_month_cv` | Hospital/office monthly CV: same + `hospital_id`, `hospital_name`, `office_id`, `hospital_level`, `sd` |
| **ProjectMonthCvArea** | `project_month_cv_area` | Area-level project CV: `project`, `sample_number`, `year`, `month`, `cv`, `average`, `standard_deviation`, `count`, `area` |

### 2.6 Mutual recognition

| Model | DB Table | Description |
|-------|----------|-------------|
| **MutualRecognition** | `mutual_recognition` | Hospital–item mutual recognition: `hos_id`, `hos_name`, `item` |

---

## 3. Backend Views & API Endpoints

### 3.1 Base view sets

- **AllSearchFilterViewSet** — ModelViewSet with `TokenAuth`, DjangoFilterBackend, SearchFilter on all model fields. Used via `create_custom(model=..., serializer=...)`.
- **AllSearchFilterViewSetWithoutAuthentication** — Same, no auth (used for dashboards, public data).

### 3.2 Hospital & indoor data

| Endpoint | ViewSet | Description |
|----------|---------|-------------|
| `HospitalDrf/` | AllSearchFilterViewSet | Full hospital CRUD + filter/search |
| `HospitalSugDrf/` | HospitalSugViewSet | Search by `hospital_name`, `office_name` |
| `HospitalOfficeDrf/` | HospitalOfficeViewSet | Offices of a hospital (`hospital_id`) |
| `BackApiIndoor19Drf/` | AllSearchFilterViewSet | Indoor 2019 raw data |
| `BackApiIndoor19TimeDrf/` | BackApiIndoor19timeViewSet | Indoor 2019 with `start_date` / `end_date` |
| `AllItemsOfHospitalOfficeDrf/` | AllItemsOfHospitalOfficeViewSet | Items by `hospitalOfficeId` |
| `AllGroupsOfHospitalOfficeItemDrf/` | AllGroupsOfHospitalOfficeItemViewSet | Instrument groups by `hospitalOfficeId` + `item` |
| `BackApiIndoor19DataDrf/` | BackApiIndoor19DataViewSet | Indoor time-series by office, item, optional group/dates |
| `AllGroupsAndOffsetOfItemDrf/` | AllGroupsAndOffsetOfItemViewSet | Groups and offset by `item` |

### 3.3 Institution page

| Endpoint | ViewSet | Description |
|----------|---------|-------------|
| `HospitalScoreDrf/` | HospitalScoreViewSet | Score (examine/indoor/outdoor/total) for `hospital_id` |
| `SameLevelHospitalScoreDrf/` | SameLevelHospitalScoreViewSet | Same-level hospital averages |
| `AllMutualRecognitionItemsOfHospitalDrf/` | AllMutualRecognitionItemsOfHospitalViewSet | Mutual-recognition items for `hospital_id` |
| `AllMutualRecognitionDrf/` | AllMutualRecognitionViewSet | All mutual-recognition records |
| `DistrictHospitalScoreDrf/` | DistrictHospitalScoreViewSet | Regional averages (optional `region_code`) |
| `SearchHospitalDrf/` | SearchHospitalViewSet | Search by `hospitalOfficeId` or `hos_name` |
| `HospitalItemNumDrf/` | HospitalItemNumViewSet | Indoor/outdoor item counts for `hospitalOfficeId` |
| `ItemMonthCvOfHospitalDrf/` | ItemMonthCvOfHospitalViewSet | Monthly CV per item for office |
| `SelectItemByCvOfHospitalDrf/` | SelectItemByCvOfHospitalViewSet | Items by CV vs 1/3 TEA (L1/L2/L3/both) |
| `OutdoorItemQualifiedDetailOfHospitalDrf/` | OutdoorItemQualifiedDetailOfHospitalViewSet | Outdoor qualified rates and lists per time |
| `HospitalItemOfSigmaDrf/` | HospitalItemOfSigmaViewSet | Items by sigma bands (<3, 3–4, 4–5, 5–6, >6) |
| `HospitalNumOfProvinceDrf/` | HospitalNumOfProvinceViewSet | Hospital count per state or territory (no auth) |

### 3.4 Search page

| Endpoint | ViewSet | Description |
|----------|---------|-------------|
| `HospitalMonthCvDrf/` | HospitalMonthCvViewSet | Monthly CV by `hospital_id`, `item`, `sample_id` |
| `OutdoorPassPercentDrf/` | OutdoorPassPercentViewSet | Outdoor pass rate by hospital + item |
| `OutdoorDataDrf/` | OutdoorDataViewSet | Outdoor data (2019 monthly) by hospital + item |
| `OutdoorOffsetCurveDrf/` | OutdoorOffsetCurveViewSet | Offset curves by hospital + item |
| `IndoorSigmaDrf/` | IndoorSigmaViewSet | Sigma for hospital + item + sample |
| `ShanghaiAvgSigmaDrf/` | ShanghaiAvgSigmaViewSet | NSW-wide average sigma |
| `LevelSigmaDrf/` | LevelSigmaViewSet | Sigma by `level` (1/2/3) |

### 3.5 Project page

| Endpoint | ViewSet | Description |
|----------|---------|-------------|
| `ItemDetailDrf/` | ItemDetailViewSet | Item overview (indoor/outdoor sample & hospital counts) |
| `MutualRecognitionDrf/` | MutualRecognitionViewSet | Mutual recognition for hospital + item |
| `AllMutualRecognitionHospitalsOfItemDrf/` | AllMutualRecognitionHospitalsOfItemViewSet | Hospitals with mutual recognition for item |
| `SearchItemDrf/` | SearchItemViewSet | Search by `domain`, `initial`, or `item_name` |
| `MonthHospitalNumOfItemDrf/` | MonthHospitalNumOfItemViewSet | Reporting hospitals per month for item |
| `MonthHospitalNumOfItemCircleDrf/` | MonthHospitalNumOfItemCircleViewSet | Same, cycling project every 5s (no auth) |
| `GroupCvOfItemDrf/` | GroupCvViewSet | CV comparison across instrument groups |
| `OutdoorDetailOfItemDrf/` | OutdoorDetailOfItemViewSet | 2019 outdoor excellent/pass/fail rates per time |
| `ItemSigmaDrf/` | ItemSigmaViewSet | Overall sigma + quartiles per concentration |
| `GroupSigmaOfItemDrf/` | GroupSigmaOfItemViewSet | Group sigma box (low, Q1, median, Q3, high) per concentration |
| `GroupSigmaOfItemCircleDrf/` | GroupSigmaOfItemCircleViewSet | Same, cycling project every 5s (no auth) |
| `EveryLevelHospitalSigmaOfItemDrf/` | EveryLevelHospitalSigmaOfItemViewSet | Sigma by hospital level + concentration |

### 3.6 Dashboard / public

| Endpoint | ViewSet | Description |
|----------|---------|-------------|
| `HospitalScoreRankDrf/` | HospitalScoreRankViewSet | Top 20 hospitals by `total_score` |
| `HospitalLevelSumDrf/` | HospitalLevelSumViewSet | Hospital count by level (1–7) |
| `HospitalAverageScoreDrf/` | HospitalAverageScoreViewSet | Average scores by level |
| `HospitalQualifiedRateDrf/` | HospitalQualifiedRateViewSet | Qualified rate by level |
| `ProjectMonthCvDrf/` | ProjectMonthCvViewSet | Monthly CV for project (or cycling) |
| `AllSatisfiedHospitalsItemDrf/` | AllSatisfiedHospitalsItemViewSet | Hospitals with coords, level, region, `item_num` |
| `AllSatisfiedItemsDrf/` | AllSatisfiedItemsViewSet | Mutual-recognition item counts |
| `RandomBackApiIndoor19DataDrf/` | RandomBackApiIndoor19DataViewSet | Random indoor series, cycling every 5s |
| `OutdoorItemLahNumDrf/` | OutdoorItemLahNumViewSet | Yearly outdoor item/lab counts |
| `IndoorItemLahNumDrf/` | IndoorItemLahNumViewSet | Yearly indoor item/lab counts |

### 3.7 Area / region

| Endpoint | ViewSet | Description |
|----------|---------|-------------|
| `ProvinceDetailDrf/` | ProvinceDetailViewSet | State/territory detail: hospitals + outdoor items |
| `MutualRecognitionOrNotItemsDrf/` | MutualRecognitionOrNotItemsViewSet | Mutual vs non-mutual item lists |
| `HospitalsOfAreaDrf/` | HospitalsOfAreaViewSet | Hospitals in area (Sydney / South East Queensland / other states and territories / single state or territory) |
| `OutdoorItemQualifiedDetailOfAreaHospitalDrf/` | OutdoorItemQualifiedDetailOfAreaHospitalViewSet | Outdoor qualified detail by area + item |
| `AllProvinceNameDrf/` | AllProvinceNameViewSet | State and territory names + codes |
| `IndoorItemCVDataOfAreaAndItemDrf/` | IndoorItemCVDataOfAreaAndItemViewSet | Indoor CV + lab count by area + item |
| `IndoorItemListOfAreaDrf/` | IndoorItemListOfAreaViewSet | Indoor items in area |
| `OutdoorItemListOfAreaDrf/` | OutdoorItemListOfAreaViewSet | Outdoor items in area |
| `SelectItemByCvOfAreaHospitalDrf/` | SelectItemByCvOfAreaHospitalViewSet | CV-based item filter for area |
| `AllMutualRecognitionHospitalOfficesOfItemDrf/` | AllMutualRecognitionHospitalOfficesOfItemViewSet | Offices with mutual recognition for item |
| `AllMutualRecognitionItemOfHospitalOfficeDrf/` | AllMutualRecognitionItemOfHospitalOfficeViewSet | Mutual-recognition items for office |

### 3.8 Auth

| Endpoint | Handler | Description |
|----------|---------|-------------|
| `login` | `obtain_jwt_token` | JWT login |

### 3.9 Frontend-called but not implemented

- **`FilterOfCvOrSigmaOfItemDrf`** — Referenced in `Project/service.tsx`; no corresponding view or URL in backend.

---

## 4. Frontend Overview

- **Stack:** React, TypeScript, Nextjs, tailwindcss, MUI
- **Charts:** BizCharts, ECharts
- **Maps:** Leaflet, react-leaflet, proj4/proj4leaflet

---

## 5. Frontend Routes & Pages

### 5.1 Configured routes

| Path | Name | Component | Menu |
|------|------|-----------|------|
| `/user/login` | login | `./user/login` | ✓ |
| `/` | — | redirect → `/index` | — |
| `/welcome` | Dashboard | `./Welcome` | ✓ (HomeOutlined) |
| `/admin` | admin | `./Admin` | ✓ (admin only) |
| `/admin/sub-page` | sub-page | `./Welcome` | ✓ (admin) |
| `/projectDetail` | Project detail | `./ctcdms/Project` | hidden |
| `/institution` | Institution | `./ctcdms/Institution` | ✓ |
| `/institutionDetail` | Institution detail | `./ctcdms/Institution` | hidden |
| `/areaInstitution` | Area | `./ctcdms/AreaInstitution` | hidden |
| `/areaInstitutionDetail` | Area detail | `./ctcdms/AreaInstitution` | hidden |
| `/search` | Search | `./ctcdms/Search` | ✓ |
| `/devcomponents` | Dev components | `./DevComponents` | ✓ |
| (unmatched) | — | `./404` | — |

Note: `/` redirects to `/index`, but there is no route for `/index` in config, so that path typically falls through to 404.

### 5.2 Page descriptions

| Page | Purpose |
|------|---------|
| **Welcome** | Dashboard — iframe to DataV dashboard `https://datav.aliyuncs.com/share/...` |
| **user/login** | Login UI (tabbed, JWT) |
| **Admin** | Admin placeholder |
| **ctcdms/Project** | Project detail: search item, CV/sigma charts, outdoor stats, mutual recognition, etc. |
| **ctcdms/Institution** | Institution view: hospital search, scores, indoor/outdoor stats, sigma bands, mutual recognition |
| **ctcdms/AreaInstitution** | Area-based institution view: area selector, same kind of stats as Institution |
| **ctcdms/Search** | Hospital + item search, indoor CV timeline, outdoor data, sigma, offset curve, etc. |
| **DevComponents** | Dev/components showcase (e.g. `HospitalAutoFillSearchBox`) |
| **ListTableList** | Table list demo (commented out in routes) |
| **404** | Not found |

### 5.3 ctcdms modules (not all routed)

These exist under `pages/ctcdms/` but are **not** registered as routes in `config.ts`:

- **Index** — Map, state/territory stats, indoor/outdoor item and lab charts, project CV. Used conceptually as index (e.g. redirect target) but no `/index` route.
- **DashboardAnalysis** — Demo dashboard (uses `/api/fake_chart_data_timeline`).
- **Geovisualization** — Geo demo (uses `/api/geovis`, `/api/statcity`, etc.).
- **Mutual** — Mutual-recognition list; used as `MutualItem` inside Institution.

---

## 6. Frontend Components

### 6.1 Global (`src/components/`)

| Component | Role |
|-----------|------|
| **Authorized** | Permission wrapper (`Authorized`, `AuthorizedRoute`, `CheckPermissions`, `PromiseRender`, `Secured`) |
| **GlobalHeader** | `AvatarDropdown`, `NoticeIconView`, `RightContent` |
| **HeaderDropdown** | Dropdown in header |
| **HeaderSearch** | Header search |
| **NoticeIcon** | Notifications |
| **PageLoading** | Loading for dynamic routes |
| **SelectLang** | Language switcher |
| **DevComponents/HospitalAutoFillSearchBox** | Hospital autocomplete search |

### 6.2 Layouts (`src/layouts/`)

| Layout | Role |
|--------|------|
| **BasicLayout** | Main app layout (ProLayout, menu, breadcrumb, footer) |
| **BlankLayout** | Minimal layout |
| **SecurityLayout** | Auth wrapper |
| **UserLayout** | Login layout |

### 6.3 ctcdms shared (`pages/ctcdms/components/`)

| Component | Role |
|-----------|------|
| **Charts** | `autoHeight`, `bizcharts`, `Pie`, `TimelineChart` |
| **HoverIconImage** | Image with hover icon |
| **NumberInfo** | Numeric display |
| **OfflineData** | Offline data placeholder |
| **PageLoading** | Loading |
| **StandardFormRow** | Form row layout |
| **TagSelect** | Tag-based select |

### 6.4 Institution / AreaInstitution

Shared structure; each has:

- **Components:** `CVLineChart`, `OutdoorAreaChart`, `SigmaPieChart`
- **Models:** `area`, `avgScore`, `hospital`, `hospitalInfo`, `hospitalItem`, `labScore`, `qualified`, `total`
- **Services:** same backend calls as in `Institution/service.tsx` and `AreaInstitution/service.tsx`

### 6.5 Project (`pages/ctcdms/Project/component/`)

| Component | Role |
|-----------|------|
| **CVLineChart** | CV over time |
| **ReportLineChart** | Reporting hospitals over time |
| **DifferentCVComparisonBarChart** | CV comparison across groups |
| **DifferentGroupBoxChart** | Sigma box by group |
| **EveryLevelHospitalSigmaBoxChart** | Sigma box by hospital level |
| **OutdoorStatistic** | Outdoor stats |
| **RateAreaChart** | Rate area chart |

### 6.6 Search (`pages/ctcdms/Search/components/`)

| Component | Role |
|-----------|------|
| **BarChartForGroupComparison** | Group comparison bar chart |
| **LineChart** | Line chart |
| **LineChartForDailyTest** | Daily test line chart |
| **Radar** | Radar chart |

### 6.7 Index (`pages/ctcdms/Index/components/`)

| Component | Role |
|-----------|------|
| **BarChart** | Bar chart (basic, group) |
| **LineChart** | Line chart |
| **PieChart** | Pie chart |
| **Map** | State/territory map + `StateInfoModal` |

### 6.8 Geovisualization (`pages/ctcdms/Geovisualization/components/`)

| Component | Role |
|-----------|------|
| **ActiveChart** | Active chart |
| **Charts** | `autoHeight`, `Gauge`, `Map`, `MiniArea`, `Pie`, `TagCloud`, `WaterWave` |

### 6.9 Login (`pages/user/login/components/Login/`)

| Component | Role |
|-----------|------|
| **Login** | Main form |
| **LoginContext** | Context for login |
| **LoginItem** | Form items |
| **LoginSubmit** | Submit button |
| **LoginTab** | Tabbed login |
| **map** | Login type mapping |

### 6.10 ListTableList (`pages/ListTableList/components/`)

- **CreateForm**, **UpdateForm** — Table CRUD forms (page not in active routes).

---

## 7. API Usage (Frontend → Backend)

- **Ctcdms pages** use `/backend/CtcdmsDg/api/...` (or `backend/CtcdmsDg/api/...`) for DRF endpoints.
- **DashboardAnalysis / Geovisualization** use `/api/...` (mock/demo), not the Django backend.
- **Request:** `umi-request`; token from `localStorage` in `utils/request.ts`.
- **Dev proxy:** In `config.ts`, `/server/api/` → `http://127.0.0.1:9100/CtcdmsDg`; frontend typically calls `/backend/...`, so either another proxy or deployment config must map `/backend/` to the same backend.

---

## 8. Deployment Notes

- **Backend:** deployed by docker, use nginx for proxy
- **Frontend:** npm run build

---

## 9. Summary

| Layer | Summary |
|-------|---------|
| **DB** | 20+ models for hospitals, items, indoor/outdoor EQA, scores, project CV, area CV, mutual recognition. All unmanaged, existing tables. |
| **Backend** | 50+ DRF endpoints (hospital, indoor, outdoor, institution, search, project, dashboard, area). JWT login; token auth on most APIs. |
| **Frontend** | 10+ routes (login, welcome, admin, project, institution, area, search, devcomponents, 404). Multiple ctcdms modules and shared charts/form components. |
| **Components** | Global (header, auth, loading), ctcdms shared (charts, TagSelect, etc.), page-specific (Project, Search, Index, Geovisualization, Login). |

---

*Generated from the Clinical Test Center Data Management System codebase.*
